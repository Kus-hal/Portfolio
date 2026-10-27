"""Synthesises the sound-effect track for a video from its cue list (window.SFX).

    python sfx.py cues.json duration out.wav

Every sound is generated here (no samples), so the track carries no licence. Cues are
{"t": seconds, "k": kind, ...}; kinds: click, type, whoosh, swipe, hit, tick, riser, glitch, scroll.
"""
import json
import sys
import wave

import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def env(n, attack, release):
    """Linear attack, exponential release, over n samples."""
    e = np.ones(n)
    a = max(1, int(attack * SR))
    e[:a] = np.linspace(0, 1, a)
    e[a:] = np.exp(-np.arange(n - a) / (release * SR))
    return e


def lowpass(x, cutoff):
    """One-pole lowpass; cutoff may be an array (a sweep)."""
    cutoff = np.broadcast_to(cutoff, x.shape)
    a = 1 - np.exp(-2 * np.pi * cutoff / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += a[i] * (x[i] - acc)
        y[i] = acc
    return y


def click():
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    body = np.sin(2 * np.pi * 2600 * t) * env(n, 0.0005, 0.004)
    snap = rng.standard_normal(n) * env(n, 0.0002, 0.0015)
    return 0.55 * body + 0.35 * np.diff(snap, prepend=0)


def tick():
    n = int(0.05 * SR)
    t = np.arange(n) / SR
    return 0.3 * np.sin(2 * np.pi * 1500 * t) * env(n, 0.001, 0.012)


def whoosh(dur=0.55, peak=0.5):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    noise = rng.standard_normal(n)
    cutoff = 300 + 5200 * np.sin(np.pi * t) ** 2
    shaped = lowpass(noise, cutoff) - lowpass(noise, cutoff * 0.25)
    amp = np.sin(np.pi * t) ** 1.6
    return peak * shaped * amp / (np.abs(shaped).max() + 1e-9)


def hit():
    n = int(1.1 * SR)
    t = np.arange(n) / SR
    freq = 48 + 70 * np.exp(-t * 18)
    boom = np.sin(2 * np.pi * np.cumsum(freq) / SR) * env(n, 0.002, 0.32)
    crack = lowpass(rng.standard_normal(n), 2500) * env(n, 0.0005, 0.02)
    return 0.9 * boom + 0.5 * crack


def riser(dur=0.8):
    n = int(dur * SR)
    t = np.linspace(0, 1, n)
    noise = lowpass(rng.standard_normal(n), 400 + 7000 * t ** 2)
    tone = np.sin(2 * np.pi * np.cumsum(220 + 660 * t ** 2) / SR)
    return (0.35 * noise / (np.abs(noise).max() + 1e-9) + 0.12 * tone) * t ** 2


def glitch(dur=1.4):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sq = np.sign(np.sin(2 * np.pi * (180 + 900 * rng.random()) * t))
    crushed = np.round(rng.standard_normal(n) * 3) / 3
    gate = np.repeat(rng.random(int(dur * 40) + 1) > 0.45, int(SR / 40) + 1)[:n]
    ramp = np.linspace(0.3, 1, n)
    return 0.22 * (0.6 * sq + 0.4 * crushed) * gate * ramp


def scroll(dur=1.2):
    out = np.zeros(int(dur * SR))
    for k in range(int(dur * 14)):
        s = int(k / 14 * SR)
        c = tick() * 0.25
        out[s : s + len(c)] += c[: len(out) - s]
    return out


def render(cues, duration):
    left = np.zeros(int((duration + 2) * SR))
    right = np.zeros_like(left)

    def put(x, at, pan=0.0, gain=1.0):
        s = int(at * SR)
        if s >= len(left):
            return
        x = x[: len(left) - s] * gain
        left[s : s + len(x)] += x * np.sqrt((1 - pan) / 2)
        right[s : s + len(x)] += x * np.sqrt((1 + pan) / 2)

    for c in cues:
        k, at = c["k"], c["t"]
        if k == "click":
            put(click(), at)
        elif k == "type":
            for i in range(c.get("n", 10)):
                put(click() * 0.45, at + i * c.get("gap", 0.08) + rng.random() * 0.015, pan=rng.uniform(-0.2, 0.2))
        elif k == "whoosh":
            # Starts slightly early so the peak lands on the cut.
            put(whoosh(), at - 0.28, pan=-0.3)
            put(whoosh() * 0.6, at - 0.24, pan=0.3)
        elif k == "swipe":
            put(whoosh(0.35, 0.35), at - 0.15, pan=0.4)
        elif k == "hit":
            put(hit(), at)
        elif k == "tick":
            put(tick(), at, pan=rng.uniform(-0.3, 0.3))
        elif k == "riser":
            r = riser()
            put(r, at - len(r) / SR + 0.7)
        elif k == "glitch":
            put(glitch(), at, pan=0.1)
            put(glitch() * 0.8, at + 0.01, pan=-0.1)
        elif k == "scroll":
            put(scroll(), at, gain=0.6)

    mix = np.stack([left, right], axis=1)[: int(duration * SR)]
    peak = np.abs(mix).max()
    if peak > 0:
        mix = mix / peak * 0.7
    return mix


def main():
    cues = json.load(open(sys.argv[1]))
    duration = float(sys.argv[2])
    mix = render(cues, duration)
    with wave.open(sys.argv[3], "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((mix * 32767).astype("<i2").tobytes())


if __name__ == "__main__":
    main()

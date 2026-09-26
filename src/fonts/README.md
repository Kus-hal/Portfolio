# Fonts

`jetbrains-mono-400-basic-latin.woff2` is JetBrains Mono Regular (SIL Open Font License 1.1,
© The JetBrains Mono Project Authors), subset to printable ASCII plus `·` (U+00B7). It is used only by
the hero ticker line.

Regenerate from the `@fontsource/jetbrains-mono` package:

```bash
pip install fonttools brotli
python -m fontTools.subset node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2 \
  --unicodes="U+0020-007E,U+00B7" --flavor=woff2 --layout-features="kern,liga,calt,tnum" \
  --output-file=src/fonts/jetbrains-mono-400-basic-latin.woff2
```

Inter and Space Grotesk are self-hosted at build time by `next/font/google`.

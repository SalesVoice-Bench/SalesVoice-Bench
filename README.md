# SalesVoice-Bench v5

Open `index.html` in a browser. The page has no build step or server requirement. Its audio and figure assets are local; the GitHub link needs internet access.

## What changed

- The paper title, seven-author list, and GitHub resource link appear at the top.
- The opening summarizes 3 task levels, 7 languages, and 18 controlled capability tests in Level 1. The Level 1, Level 2, and Level 2+ definitions are placed directly below those figures.
- The benchmark-positioning section presents the problem first, then pairs each introduction limitation with its corresponding challenge and benchmark component. Figure 1 is displayed at a smaller scale alongside this explanation.
- Paper Figures 1–3 are rendered as responsive static images inside the page’s custom layouts. Select an image to open it full size. No PDF viewer or source-PDF download links are shown.
- The task suite and CustomerAgent sections follow the meeting’s requested order. The 24 selected audio cases remain available offline.

The homepage’s 18 refers to Level 1’s controlled capability tests, not the number of experimental configurations. The paper reports experiments across 16 configurations. Level 2 contains 200 first contacts per configuration, and Level 1 has 500 registered executions per configuration.

## Audio selection

There are 24 audio cases: 8 each for Level 1, Level 2, and Level 2+. Each level has two English cases and one case in Arabic, Chinese, Hindi, Japanese, Spanish, and Thai. Level 2+ cards include the linked Level 2 first-contact recording and the follow-up recording.

The six non-English examples have not received independent native-speaker review. The recordings illustrate interaction patterns; they are not live voice-agent evaluation runs. `case_manifest.csv` lists each audio path, language, level, and SHA-256 hash.

## Authors and resources

Authors, in supplied order: Fengxian Ji, Jinri Guo, Rongxin Zhu, Jingpu Yang, Junhong Liang, Fan Zhang, and Zhuohan Xie. The affiliations shown beneath the author list are Kapibala AI, Mohamed bin Zayed University of Artificial Intelligence (MBZUAI), Beijing Zhongguancun Academy, and The University of Melbourne. The page lists the institutions without assigning individual authors to them.

The GitHub repository link in the page points to `https://anonymous.4open.science/r/salesvoice-eval-toolkit-FFE5/`, as specified in the paper source.

## Files

- `index.html`, `styles.css`, `script.js`, `case-data.js` — webpage and local interactions
- `assets/audio/` — 24 selected audio files
- `assets/paper-figures/` — paper source PDFs and web previews for Figures 1–3
- `data/cases/` — selected scripts and event summaries
- `case_manifest.csv` — audio inventory and hashes

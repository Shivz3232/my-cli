const open = require("open");

const choices = [
  {
    name: "Visit web site",
    actor: () => {
      open("https://portfolio.gorva.me")
    }
  },
  {
    name: "View portfolio",
    actor: () => {
      open("https://portfolio.gorva.me/resume")
    }
  },
  {
    name: "Download resume",
    actor: () => {
      open("https://drive.google.com/file/d/1-czIhtc0CHQEO1aE_CQh4mHU8p8m7N0N/view?usp=sharing")
    }
  },
  {
    name: "Misc quick links",
    actor: () => {
      open("https://emeraldpharms.hns.to")
    }
  }
]

module.exports = choices;
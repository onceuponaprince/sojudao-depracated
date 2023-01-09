
module.exports = {
    "parser": "babel-eslint",
    "extends": [
      "react",
      "react/jest"
    ],
    "env": {
      "browser": true,
      "node": true,
      "es2020": true
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
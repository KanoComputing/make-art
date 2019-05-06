module.exports = {
    extends: "@kano",
    parser: "babel-eslint",
    "rules": {
        "no-unused-expressions": ["error", {"allowTernary": true}],
        "no-underscore-dangle": ["off"],
        "no-param-reassign": ["off"],
    },
};

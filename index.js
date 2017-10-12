var tslint = require("tslint");

var programs = {};

module.exports = function TSLint(file, options) {
    var configuration = options.configuration;
    if (configuration == null || typeof configuration === "string") {
        configuration = tslint.Configuration.findConfiguration(configuration, file.srcPath).results;
    } else {
        configuration = tslint.Configuration.parseConfigFile(configuration, options.cwd);
    }
    var program = options.program || (require("digo").existsFile("tsconfig.json") ? "tsconfig.json" : undefined);
    if (typeof program === "string") {
        const key = (options.cwd || "") + "/" + program;
        program = programs[key] || (programs[key] = tslint.Linter.createProgram(program, options.cwd));
    }

    var linter = new tslint.Linter({
        fix: options.fix || false,
        formatter: options.formatter || "prose",
        formattersDirectory: options.formattersDirectory || null,
        rulesDirectory: options.rulesDirectory || null
    }, program);
    linter.lint(file.srcPath, file.content, configuration);

    var result = linter.getResult();
    for (const failure of result.failures) {
        const startLoc = failure.getStartPosition().getLineAndCharacter();
        const endLoc = failure.getEndPosition().getLineAndCharacter();
        const e = {
            plugin: TSLint.name,
            message: failure.getRuleName() + ": " + failure.getFailure(),
            fileName: failure.getFileName(),
            line: startLoc.line,
            column: startLoc.character,
            endLine: endLoc.line,
            endColumn: endLoc.character
        };
        if (options.level === "warning" || options.level !== "error" && failure.getRuleSeverity() === "warning") {
            file.warning(e);
        } else {
            file.error(e);
        }
    }
};

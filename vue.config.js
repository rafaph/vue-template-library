module.exports = {
  chainWebpack(config) {
    // Library name
    const libraryName = "myLibrary";

    // Set library name as entry point and delete app
    config.entryPoints
      .set(libraryName, config.entryPoints.get("app"))
      .delete("app")
      .end();

    // webpack settings for generate a library
    config.output
      .set("filename", "[name].js")
      .set("libraryTarget", "umd")
      .set("library", libraryName)
      .end();

    // set vue as external dependency
    config
      .set("externals", {
        vue: "vue"
      })
      .end();

    // delete unused plugins
    config.plugins
      .delete("hash-module-ids")
      .delete("split-vendor")
      .delete("split-manifest")
      .delete("inline-manifest")
      .delete("split-vendor-async")
      .delete("html")
      .end();

    // remove hash of css filename
    config
      .plugin("extract-css")
      .tap(args => {
        args[0].filename = "[name].css";
        return args;
      })
      .end();
  }
};

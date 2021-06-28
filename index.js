const express = require("express");
const app = express();

const getFileName = ({ os, version, arch }) => {
  const ext = os === "win" ? ".exe" : "";
  return "please-" + version + "-" + os + "-" + arch + ext;
};

const usage = `\
Usage: GET /:version/:os?/:arch?
Defaults: os=linux arch=x64`;

app.get("/", (req, res) => {
  res.end(usage);
});

const redir = (res, version, fileName) => {
  const url = `https://github.com/pleasecmd/please/releases/download/v${version}/${fileName}`;
  res.redirect(url);
};

app.get("/:version/:os/:arch", (req, res) => {
  const fileName = getFileName(req.params);
  redir(res, req.params.version, fileName);
});

app.get("/:version/:os", (req, res) => {
  const params = { ...req.params, arch: "x64" };
  const fileName = getFileName(params);
  redir(res, req.params.version, fileName);
});

app.get("/:version", (req, res) => {
  const params = { ...req.params, os: "linux", arch: "x64" };
  const fileName = getFileName(params);
  redir(res, req.params.version, fileName);
});

module.exports = app;

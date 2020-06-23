# ipyreactwidgets

[Documentation](https://weatherforce-platform.gitlab.io/ipyreactwidgets/)

This is the final repository where the library should live. It aims to provide
a variety of base widgets, that will be slowly integrated from cookiecutter
created widgets. In addition, it will provide a Register nbextension that will
allow to embed widgets into layouts one.

## Installation

TODO

## Development installation 

### Building JavaScript

```bash
cd nbextensions_srcs
npm install
npm run build
```

### Installing Python packages

```bash
python3 -m venv <your-env>
source <your-env>/bin/activate
python3 -m pip install -r dev_requirements.txt
python3 -m pip install -e .
```

## Running tests

TODO

## Building documentation

To build the documentation locally:

```bash
cd docs
make html
```

HTML files will be created in build/html.

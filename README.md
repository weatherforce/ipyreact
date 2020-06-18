# ipyreactwidgets

This is the final repository where the library should live. It aims to provide a variety of base widgets,
that will be slowly integrated from cookiecutter created widgets. In addition, it will provide a Register
nbextension that will allow to embed widgets into layouts one.

## Installation 

### Build JavaScript

```bash
cd nbextensions_srcs
npm install
npm run build
```

### Install Python Modules
```bash
python3 -m virtualenv <your-env>
source <your-env>/bin/activate
pip install -r requirements.txt
```

## Tests

TODO

## Documentation

To create the documentation locally:
```bash
cd docs
make html
```
the html files created will be located in build/html.

to have a look at existing documentation, check it out here, it is online [wiki page](https://weatherforce-platform.gitlab.io/ipyreactwidgets/).

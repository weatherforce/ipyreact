import setuptools
from ipyreactwidgets import __version__
import os


def generate_data_files():
    pathlist = []
    widgetlist = os.listdir(path="./nbextensions_dists")
    for a_widget in widgetlist:
        pathlist.append((f"share/jupyter/nbextensions/{a_widget}",
                         [f"nbextensions_dists/{a_widget}/index.js"]))
        pathlist.append(("etc/jupyter/nbconfig/notebook.d",
                         [f"nbextensions_dists/{a_widget}/{a_widget}.json"]))
    return pathlist


with open("README.md", 'r') as fh:
    long_description = fh.read()

setuptools.setup(
    name="ipyreactwidgets",
    version=__version__,
    author="weatherforce",
    author_email="opensource@weatherforce.org",
    description="A widget library, based on React",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="git@gitlab.com:weatherforce-platform/ipyreactwidgets.git",
    data_files=generate_data_files(),
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)

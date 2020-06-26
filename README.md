# Gendiff (Hexlet Frontend Project Level 2)

[![Node.js CI](https://github.com/neihaoo/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg)](https://github.com/neihaoo/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/9332ebbc26c130ef75b4/maintainability)](https://codeclimate.com/github/neihaoo/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9332ebbc26c130ef75b4/test_coverage)](https://codeclimate.com/github/neihaoo/frontend-project-lvl2/test_coverage)

## Table of Contents

- [Install](#Install)
- [Usage](#Usage)
  - [JSON](#JSON)
  - [YAML](#YAML)
  - [INI](#INI)

## Install

```sh
$ npm link
```

[![asciicast](https://asciinema.org/a/uO6RQkG88Njg1wo8m0ichk0op.svg)](https://asciinema.org/a/uO6RQkG88Njg1wo8m0ichk0op)

## Usage

### JSON

```sh
$ gendiff before.json after.json
```

[![asciicast](https://asciinema.org/a/EkTeB8FWLJb0zEmHAQKDJVNz2.svg)](https://asciinema.org/a/EkTeB8FWLJb0zEmHAQKDJVNz2)

```sh
$ gendiff before_nested.json after_nested.json
```

[![asciicast](https://asciinema.org/a/AJIOgOfvsmVFde2lFjirPAcMw.svg)](https://asciinema.org/a/AJIOgOfvsmVFde2lFjirPAcMw)

```sh
$ gendiff --format plain before.json after.json
```

[![asciicast](https://asciinema.org/a/Ypd0YlOzB7NUV6RuJqL8IAYU7.svg)](https://asciinema.org/a/Ypd0YlOzB7NUV6RuJqL8IAYU7)

```sh
$ gendiff --format json before.json after.json
```

[![asciicast](https://asciinema.org/a/Ez6wPmjUaaWqced7pl4jpVsyM.svg)](https://asciinema.org/a/Ez6wPmjUaaWqced7pl4jpVsyM)

### YAML

```sh
$ gendiff before.yml after.yml
```

[![asciicast](https://asciinema.org/a/tzoWPQ5hGHWL6HcX3Iv5DeIbe.svg)](https://asciinema.org/a/tzoWPQ5hGHWL6HcX3Iv5DeIbe)

```sh
$ gendiff before_nested.yml after_nested.yml
```

[![asciicast](https://asciinema.org/a/xp5GHsEcQRiOzOK5difiFo5iU.svg)](https://asciinema.org/a/xp5GHsEcQRiOzOK5difiFo5iU)

```sh
$ gendiff --format plain before.yml after.yml
```

[![asciicast](https://asciinema.org/a/LkKmw3U6M4zvajqAbgxRoOr35.svg)](https://asciinema.org/a/LkKmw3U6M4zvajqAbgxRoOr35)

```sh
$ gendiff --format json before.yml after.yml
```

[![asciicast](https://asciinema.org/a/9SafJWkZorD62jXv5HXTUnhAd.svg)](https://asciinema.org/a/9SafJWkZorD62jXv5HXTUnhAd)

### INI

```sh
$ gendiff before.ini after.ini
```

[![asciicast](https://asciinema.org/a/YwLrgUYmMFNZdJBEGONOkPQM8.svg)](https://asciinema.org/a/YwLrgUYmMFNZdJBEGONOkPQM8)

```sh
$ gendiff before_nested.ini after_nested.ini
```

[![asciicast](https://asciinema.org/a/QRXYcJObPWXVGbgySuJPl4c9J.svg)](https://asciinema.org/a/QRXYcJObPWXVGbgySuJPl4c9J)

```sh
$ gendiff --format plain before.ini after.ini
```

[![asciicast](https://asciinema.org/a/AWgPl67IhHipRHQsGtv00Qeyn.svg)](https://asciinema.org/a/AWgPl67IhHipRHQsGtv00Qeyn)

```sh
$ gendiff --format json before.ini after.ini
```

[![asciicast](https://asciinema.org/a/3rhLM3XA1WMAsQY4PDTo0Mm5M.svg)](https://asciinema.org/a/3rhLM3XA1WMAsQY4PDTo0Mm5M)

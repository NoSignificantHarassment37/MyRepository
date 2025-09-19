def try_parse_int(value, default=None):
    try:
        return int(value)
    except (ValueError, TypeError):
        return default


def try_parse_float(value, default=None):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def try_parse(value, tipo, default=None): # No retorna booleano.
    try:
        return (tipo(value), True)
    except (ValueError, TypeError):
        return (default, False)

def try_parse_bool(value, default=None):
    if isinstance(value, str):
        value = value.strip().lower()
        if value in ("true", "1", "sí", "si", "yes"):
            return True
        elif value in ("false", "0", "no"):
            return False
    elif isinstance(value, bool):
        return value
    return default
def try_parse(value, tipo, default=None): # No retorna booleano.
    try:
        return (tipo(value), True)
    except (ValueError, TypeError):
        return (default, False)
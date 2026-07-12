# Le donne nell’arte

Sito statico predisposto per GitHub Pages.

## Pubblicazione

1. Crea un nuovo repository GitHub, per esempio `le-donne-nell-arte`.
2. Carica tutti i file e le cartelle contenuti in questo pacchetto.
3. In GitHub apri **Settings → Pages**.
4. In **Build and deployment**, scegli **Deploy from a branch**.
5. Seleziona il ramo `main` e la cartella `/ (root)`, poi salva.

## Inserire i link Canva

Apri `data/artists.json` e, per ogni artista, incolla il collegamento pubblico di sola visualizzazione nel campo:

```json
"video_url": "https://www.canva.com/design/..."
```

Non usare collegamenti di modifica.

## Aggiungere un’artista

Duplica una voce nel file `data/artists.json` e modifica:

- `name`
- `dates`
- `period`
- `slug`
- `video_url`
- `image`

Le pagine e i filtri si aggiornano automaticamente.

## Nota

Questa è una prima versione strutturale. Include le artiste chiaramente rilevate nelle sezioni Quattrocento, Cinquecento e Seicento del Google Sites. Le artiste dei periodi successivi potranno essere aggiunte nello stesso file dati.

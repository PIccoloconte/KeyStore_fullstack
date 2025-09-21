1. fare il deploy su vercel , sistemare le chimate api prima di farlo

2. vedere se è possibile mandare una mail con i codici dopo aver fatto l'acquisto

3. modificare il fatto che la api games quando passo le mie piattaforme me le devono passare in lowercase e la pagina della navabar con il
   metodo handlePlatformFilter() debba convertire le stringhe solo in lowercase

Modicicata la porta di acesso su index.js a quella di render
modificato su package.json di wev
"scripts": {
"dev": "next dev --turbopack",}
in
"scripts": {
"dev": "next dev --turbopack -p 3001",}
Modificato anche useCors su index.js

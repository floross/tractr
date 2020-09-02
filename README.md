# Tractr test

> Créer une mini web app (back-end + front-end dans les technologies de ton choix) contenant:
> - une page listing (de vidéos / produits / utilisateurs, à toi de choisir) avec possibilité de filtrer la liste selon 3 à 4 filtres différents.
> - une page de détail des videos / produits... Par exemple, si c'est une vidéo, un Embed youtube avec une description et l'affichage des critères utilisés dans les filtres suffirait.

I choose for this test to build a serverless application. 
I used in this test the new library Prisma (2.beta) in association with Nest.Js, GraphQL Nexus and tailwindCss.

A second server has been developed next to this app to acknowledge my capacity to develop both types of app.

## Prisma

#### Migrate your model

```bash
npx prisma migrate save --name '<YOUR_NAME>' --experimental
npx prisma migrate up --experimental
```

#### Generate your prisma and nexus definitions

```bash
yarn generate
```

## Next.JS

#### Start the app in dev mode

```bash
yarn dev
```

#### Build the app

```bash
yarn build
```

#### Start the app in production mode (after building)

```bash
yarn start
```

## Other scripts

#### Lint the all project

```bash
yarn lint
```

#### Populate the database with fake data

```bash
yarn seed
```

## Note on the UserList and UserDetail page

The `UserList` page is built with NextJS ssr mode and the `UserDetail` page is built with NextJS static generation. With this type of app we should only use the static generation, but I choosed the ssr mode page as a proof of concept.

## Way to improuve the app

* Write unit and integration test
* Split and normalize form components
* Use a global state management (promising one is [Recoil.js](https://recoiljs.org/))
* Add pagination to the user list
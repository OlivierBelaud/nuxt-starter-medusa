<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa Nuxt Starter Template
</h1>

<p align="center">
Combine Medusa's modules for your commerce backend with the newest Nuxt v3, ready for v4, features for a performant storefront.</p>

### Prerequisites

To use the [Nuxt Starter Template](https://nuxt-medusa.pages.dev), you should have a Medusa server running locally on port 9000.
For a quick setup, run:

```shell
npx create-medusa-app@latest
```

Check out [create-medusa-app docs](https://docs.medusajs.com/create-medusa-app) for more details and troubleshooting.

# Overview

The Medusa Nuxt Starter is built with:

- [Nuxt v3, ready for v4](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Medusa v2](https://medusajs.com/)

Features include:

- Full ecommerce support:
  - Product Detail Page
  - Product Overview Page
  - Product Collections
  - Cart: in progress
  - Checkout with Stripe: in progress
  - User Accounts: in progress
  - Order Details: in progress
- Full Nuxt support:
  - App Router
  - Nuxt fetching/caching
  - Server Components
  - Static Pre-Rendering
  - NuxtHub (Cloudflare deployment)
  - NuxtUi

# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd nuxt-starter-medusa/
mv .env.template .env.local
```

### Install dependencies

Use Pnpm to install all dependencies.

```shell
pnpm install
```

### Start developing

You are now ready to start up your project.

```shell
pnpm run dev
```

### Open the code and start customizing

Your site is now running at http://localhost:3000!

# Payment integrations: Work In Progress

By default this starter supports the following payment integrations

- [Stripe](https://stripe.com/)

To enable the integrations you need to add the following to your `.env.local` file:

```shell
NUXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

You'll also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe#main).

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)

## Learn more about Nuxt

- [Website](https://nuxt.com/)
- [GitHub](https://github.com/nuxt/nuxt)
- [Documentation](https://nuxt.com/docs/getting-started/introduction)
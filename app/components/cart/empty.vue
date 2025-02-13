<template>
  <div class="py-48 px-2 flex flex-col justify-center items-start">
    <h1 class="text-black font-sans font-semibold flex flex-row text-3xl gap-x-2 items-baseline">
      Cart
    </h1>
    <p class="font-medium text-sm mt-4 mb-6 max-w-[32rem] text-neutral-900">
      You don't have anything in your cart. Let's change that, use the link below to start browsing our products.
    </p>
    <div>
      <AppLinkButton
        to="/store"
        class="pl-0"
      >
        Explore products
      </AppLinkButton>
    </div>
  </div>
</template>

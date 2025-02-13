export const useCheckoutStep = () => {
  const route = useRoute()
  const router = useRouter()

  onMounted(async () => {
    if (!route.query.step) {
      await router.replace({
        query: { ...route.query, step: 'address' },
      })
    }
  })

  const currentStep = computed(() => {
    return (route.query.step as string) || 'address'
  })

  const goToStep = async (step: string) => {
    await router.push({
      query: { ...route.query, step },
    })
  }

  return {
    currentStep,
    goToStep,
  }
}

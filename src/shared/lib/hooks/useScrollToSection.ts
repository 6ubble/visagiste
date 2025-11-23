export function useScrollToSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = window.innerWidth >= 768 ? 80 : 64
      const elementPosition = element.offsetTop - headerHeight + 30
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  return { scrollToSection }
}
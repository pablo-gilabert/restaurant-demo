import { useEffect } from "react"

type SEOProps = {
  title: string
  description: string
}

// Synchronizes the document title and description meta tag with the active page.
const SEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    document.title = title

    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')

    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta")
      descriptionMeta.name = "description"
      document.head.appendChild(descriptionMeta)
    }

    descriptionMeta.content = description
  }, [title, description])

  return null
}

export default SEO

import {
  useEffect,
} from "react"

type SEOProps = {
  title: string
  description: string
}

const SEO = ({
  title,
  description,
}: SEOProps) => {

  useEffect(() => {

    document.title = title

    let descriptionMeta = document.querySelector(
      'meta[name="description"]'
    )

    if (!descriptionMeta) {

      descriptionMeta = document.createElement("meta")

      descriptionMeta.setAttribute(
        "name",
        "description"
      )

      document.head.appendChild(descriptionMeta)

    }

    descriptionMeta.setAttribute(
      "content",
      description
    )

  }, [title, description])

  return null
}

export default SEO
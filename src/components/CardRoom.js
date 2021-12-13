import React from "react"
import Link from "next/link"

import { Card } from "react-bootstrap"

import Stars from "./Stars"
import Image from "./CustomImage"
import Icon from "./Icon"

const CardRoom = (props) => {
  const data = props.data
  return (
    <Card className="h-100 border-0 shadow">
      <div className="card-img-top overflow-hidden gradient-overlay">
        <Image
          src={`/content/img/photo/${data.image}`}
          width={1350}
          height={900}
          alt={data.name}
          layout="responsive"
          loading={props.eager ? "eager" : "lazy"}
          className="img-fluid"
          sizes={
            props.sizes
              ? props.sizes
              : "(max-width:576px) 100vw, (max-width:991px) 50vw, (max-width:1149px) 30vw, 280px"
          }
        />
        {/* <Link href={{ pathname: '/detail-rooms', query: {index: `${data.index}`}}} >
          <a
            className="tile-link"
            aria-label={`Read more about ${data.title}`}
          />
        </Link> */}
        {/* <Link
              href="/detail-rooms/[slug]"
              as={`/detail-rooms/${data.slug}`}
              passHref
            ></Link> */}
        
        <div className="card-img-overlay-top text-end">
          <a
            className="card-fav-icon position-relative z-index-40"
            href="#"
            aria-label={`Add ${data.title} to wishlist`}
          >
            <Icon icon="heart-1" className="text-white" />
          </a>
        </div>
      </div>
      <Card.Body className="d-flex align-items-center">
        <div className="w-100">
          <Card.Title as="h4">
          {data.name}
            {/* <Link href={{ pathname: '/detail-rooms', query: {index: data.index}}} >
              <a className="text-decoration-none text-dark">{data.name}</a>
            </Link> */}
            {/* <Link
              href="/detail-rooms/[slug]"
              as={`/detail-rooms/${data.slug}`}
              passHref
            ></Link> */}
          </Card.Title>
          <Card.Subtitle className="d-flex mb-3" as="div">
            <p className="flex-grow-1 mb-0 text-muted text-sm">
              {data.address}
            </p>
            
          </Card.Subtitle>
          <Card.Text className="text-muted">
            <span className="h6 text-primary">{data.subtitle}</span>
            
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardRoom
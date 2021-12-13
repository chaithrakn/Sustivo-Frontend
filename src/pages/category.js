import React from "react"
import Link from "next/link"

import { Container, Row, Col, Nav } from "react-bootstrap"

import CardRoom from "../components/CardRoom"
import ResultsTopBar from "../components/ResultsTopBar"
import Pagination from "../components/Pagination"
import Map from "../components/Map"

import data from "../data/category.json"
import geoJSON from "../data/rooms-geojson.json"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "All Hotels",
    },
  }
}

const Category = () => {
  const [hoverCard, setHoverCard] = React.useState(null)
  const onCardEnter = (id) => {
    setHoverCard(id)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }

  return (
    <React.Fragment>
      <section>
        <div className="map-wrapper-450">
          <Map
            //center={[0, 0]}
            className="h-100"
            zoom={14}
            geoJSON={geoJSON}
            popupVenue
            hoverCard={hoverCard}
          />
        </div>
      </section>
      <section className="py-5 bg-gray-100 shadow">
        <Container>
          <h1>{data.title}</h1>
          <p className="lead mb-5">{data.content && data.content}</p>
          
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <ResultsTopBar sortBy={data.sortby} />
          {geoJSON.features && (
            <Row>
              {geoJSON.features.map((place, index) => (
                <Col
                  key={index}
                  sm="6"
                  lg="4"
                  className="mb-5 hover-animate"
                  onMouseEnter={() => onCardEnter(place.properties.id)}
                  onMouseLeave={() => onCardLeave()}
                >
                  <CardRoom
                    data={place.properties}
                    sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, 420px"
                  />
                </Col>
              ))}
            </Row>
          )}
          <Pagination />
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Category

import React from "react"
import Link from "next/link"

import "react-dates/initialize"

import { useRouter } from 'next/router'

import { Container, Row, Col, Form, Button, Badge } from "react-bootstrap"
import UseWindowSize from "../hooks/UseWindowSize"
import { DateRangePicker } from "react-dates"
import Swiper from "../components/Swiper"

import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"

import details from "../data/detail-rooms.json"

import SwiperGallery from "../components/SwiperGallery"
import Gallery from "../components/Gallery"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useState, useEffect } from 'react';

import {
  faBath,
  faBed,
  faDoorOpen,
  faHeart,
  faLaptop,
  faLongArrowAltRight,
  faMapMarkerAlt,
  faSnowflake,
  faThermometerThreeQuarters,
  faTshirt,
  faTv,
  faUsers,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "../components/Avatar"

export async function getStaticProps() {
  //const index = query.index;
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms detail",
      //index: index
    },
  }
}

const DetailRooms = () => {
  const router = useRouter();
  useEffect(()=>{
    if(!router.isReady) {
      return <span>Loading...</span>;
      
    }  
    
    // codes using router.query

}, [router.isReady]);

  var index = router.query ? router.query.index : 0
  const data = details[index]
  // console.log(data)
  
  const size = UseWindowSize()
  const [range, setRange] = React.useState([
    { startDate: new Date() },
    { endDate: "" },
  ])
  const [dateFocused, setDateFocused] = React.useState(range.startDate)

  const groupByN = (n, data) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result
  }

  const groupedAmenities = data.amenities && groupByN(4, data.amenities)

  return (
    <React.Fragment>
      <section>
        <SwiperGallery data={data.swiper} />
        <Container className="py-5">
          <Row>
            <Col lg="8">
              
              <div className="text-block">
              {data.name && <h1>{data.name}</h1>}
                <h6 className="text-primary">

                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                  &nbsp;{data.address && data.address}
                </h6>

                <h6 className="text-primary">

                  
                  Website: {data.website && data.website}
                </h6>
                
                {data.category && (
                  <div className="text-muted text-uppercase mb-4">
                    {data.category}
                  </div>
                )}
                {data.tags && (
                  <ul className="list-inline text-sm mb-4">
                    {data.tags.map((tag) => {
                      let tagIcon
                      switch (tag.icon) {
                        case "door-open":
                          tagIcon = faDoorOpen
                          break
                        case "bed":
                          tagIcon = faBed
                          break
                        case "bath":
                          tagIcon = faBath
                          break
                        default:
                          tagIcon = faUsers
                      }
                      return (
                        <li key={tag.value} className="list-inline-item me-3">
                          <FontAwesomeIcon
                            icon={tagIcon}
                            className="me-1 text-secondary"
                          />

                          {tag.value}
                        </li>
                      )
                    })}
                  </ul>
                )}
                <p className="text-muted fw-light">
                  {data.description}{" "}
                </p>
                <h6 className="mb-3">Our give-back initiatives</h6>
                <p className="text-muted fw-light">
                  {data.extra}{" "}
                </p>
                
              </div>

              <h4 className="mb-4">Sustivo Values</h4>
              {data.values && (
                  <ul className="list-inline text-sm mb-4">
                    {data.values.map((val) => {
                    
                      return (
                        <li key={val.value} className=" me-3">
                          <FontAwesomeIcon
                            //icon={tagIcon}
                            className="me-1 text-secondary"
                          />
                          <p><span className="text-sm">
                            {val.value}
                          </span></p>
                        </li>
                        
                      )
                    })}
                  </ul>
                )}   

              {data.amenities && (
                <React.Fragment>
                  <div className="text-block">
                    <h4 className="mb-4">Amenities</h4>
                    <Row>
                      {groupedAmenities &&
                        groupedAmenities.map((amenityBlock) => (
                          <Col key={amenityBlock[0].value} md="6">
                            <ul className="list-unstyled text-muted">
                              {amenityBlock.map((amenity) => {
                                let amenityIcon
                                switch (amenity.icon) {
                                  case "tv":
                                    amenityIcon = faTv
                                    break
                                  case "snowflake":
                                    amenityIcon = faSnowflake
                                    break
                                  case "thermometer-three-quarters":
                                    amenityIcon = faThermometerThreeQuarters
                                    break
                                  case "bath":
                                    amenityIcon = faBath
                                    break
                                  case "utensils":
                                    amenityIcon = faUtensils
                                    break
                                  case "laptop":
                                    amenityIcon = faLaptop
                                    break
                                  case "tshirt":
                                    amenityIcon = faTshirt
                                    break
                                  default:
                                    amenityIcon = faWifi
                                }
                                return (
                                  <li key={amenity.value} className="mb-2">
                                    <FontAwesomeIcon
                                      icon={amenityIcon}
                                      className="text-secondary w-1rem me-3 text-center"
                                    />

                                    <span className="text-sm">
                                      {amenity.value}
                                    </span>
                                  </li>
                                )
                              })}
                            </ul>
                          </Col>
                        ))}
                    </Row>
                  </div>
                  
                </React.Fragment>
              )}

               

             
              {data.author && (
                <div className="text-block">
                  <div className="d-flex">
                    <Avatar
                      size="lg"
                      image={`/content/img/avatar/${data.author.avatar}`}
                      className="me-4"
                      border
                      alt={data.author.name}
                    />

                    <div>
                      <p>
                        <span className="text-muted text-uppercase text-sm">
                          Hosted by
                        </span>
                        <br />
                        <strong>{data.author.name}</strong>
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.author.content,
                        }}
                      />
                      <p className="text-sm">
                        <Link href="/user-profile">
                          <a>
                            See{" "}
                            {data.author.name.split(" ").slice(0, -1).join(" ")}
                            's 3 other listings{" "}
                            <FontAwesomeIcon
                              icon={faLongArrowAltRight}
                              className="ms-2"
                            />
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-block">
                <h3 className="mb-4">Location</h3>
                <div className="map-wrapper-300 mb-3">
                  <Map
                    className="h-100"
                    center={[-13.2962617,-72.1300811]}
                    circlePosition={[-13.2962617,-72.1300811]}
                    circleRadius={500}
                    zoom={14}
                  />
                </div>
              </div>

              {data.swiper && (
                <div className="text-block">
                  <h3 className="mb-4">Gallery</h3>
                  <Gallery
                    rowClasses="ms-n1 me-n1"
                    lg="4"
                    xs="6"
                    colClasses="px-1 mb-2"
                    data={data.swiper}
                  />
                </div>
              )}
              {data.reviews && <Reviews data={data.reviews} />}
              <ReviewForm />
            </Col>
            <Col lg="4">
              <div
                style={{ top: "100px" }}
                className="p-4 shadow ms-lg-4 rounded sticky-top"
              >
                <p className="text-muted">
                  <span className="text-primary h2">
                    Coming Soon!
                  </span>{" "}
                  
                </p>
                <hr className="my-4" />
                <Form
                  id="booking-form"
                  method="get"
                  action="#"
                  autoComplete="off"
                  className="form"
                >
                  <div>
                    <Form.Label>Your stay *</Form.Label>
                    <DateRangePicker
                      startDate={range.startDate}
                      startDateId="fromDate"
                      endDate={range.endDate}
                      endDateId="toDate"
                      block={true}
                      onDatesChange={({ startDate, endDate }) =>
                        setRange({ startDate, endDate })
                      }
                      focusedInput={dateFocused}
                      onFocusChange={(dateFocused) =>
                        setDateFocused(dateFocused)
                      }
                      orientation={size.width < 400 ? "vertical" : "horizontal"}
                    />
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="guests">Guests *</Form.Label>
                    <Form.Select name="guests" id="guests">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                    </Form.Select>
                  </div>
                  <div className="d-grid mb-4">
                    <Button type="submit">Book your stay</Button>
                  </div>
                </Form>
                {/* <p className="text-muted text-sm text-center">
                  Some additional text can be also placed here.
                </p> */}
                <hr className="my-4" />
                <div className="text-center">
                  {/* <p>
                    <a href="#" className="text-secondary text-sm">
                      <FontAwesomeIcon icon={faHeart} />
                      &nbsp;Bookmark This Listing
                    </a>
                  </p>
                  <p className="text-muted text-sm">
                    79 people bookmarked this place{" "}
                  </p> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {data.similar && (
        <section className="py-6 bg-gray-100">
          <Container>
            <h5 className="mb-0">{data.similar.title}</h5>
            <p className="subtitle text-sm text-primary mb-4">
              {data.similar.subtitle}
            </p>
            <Swiper
              className="swiper-container-mx-negative items-slider pb-5"
              perView={1}
              spaceBetween={20}
              loop={true}
              roundLengths={true}
              md={2}
              lg={3}
              xl={4}
              data={data.similar.items}
              cards
              pagination
            />
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

export default DetailRooms
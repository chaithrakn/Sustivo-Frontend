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

import data from "../data/detail-rooms.json"
import { useState, useEffect } from 'react';
import { getHotel } from '../hooks/hotels';

import SwiperGallery from "../components/SwiperGallery"
import Gallery from "../components/Gallery"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

import { useLocation } from 'react-router-dom'

export async function getStaticProps(context) {
  console.log(context.query) 
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms detail",
    },
  }
}


const DetailRooms = (props) => {
  const router = useRouter()
  console.log(router.query);
  console.log(router.query.id);

  const [hotel, setHotel] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:8081/hotels/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => {
        setHotel(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  console.log(hotel)
  console.log(hotel.values)

  const size = UseWindowSize()
  const [range, setRange] = React.useState([
    { startDate: new Date() },
    { endDate: "" },
  ])
  const [dateFocused, setDateFocused] = React.useState(range.startDate)

//   const tagItems = hotel.tags.map((item) =>
//   <li>
//     {item}
//   </li>
// );

  return (
    <React.Fragment>
      <section>
        <SwiperGallery data={data.swiper} />
        <Container className="py-5">
          <Row>
            <Col lg="8">

              <div className="text-block">
              {hotel.name && <h1>{hotel.name}</h1>}
                <h4 className="text-primary">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                  &nbsp;{hotel.city && hotel.city}, {hotel.country && hotel.country}
                  
                </h4>
                
                
                {data.tags && (
                  <ul className="list-inline text-sm mb-4">
                    {data.tags.map((tag) => {
                      let tagIcon
                      switch (tag.icon) {
                        case "carbonNeutral":
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

                {/* {hotel.tags && (
                  <ul className="list-inline text-sm mb-4">
                    {tagItems}
                    {hotel.tags.map((tag) => {
                      
                      return (
                        <li key={tag.value} className="list-inline-item me-3">

                          {tag.value}
                        </li>
                      )
                    })}
                  </ul> */}
                {/* )} */}
                
                <p className="text-muted fw-light">
                  {hotel.description}
                </p>
                <h6 className="mb-3">Sustivo Values</h6>
                {/* <div>
                    {hotel.values}.map((item, key) => (
                      <li key={key}>{item}</li>))}
                </div>   */}
                
              </div>
              
              
              <div className="text-block">
                <h3 className="mb-4">Location</h3>
                <div className="map-wrapper-300 mb-3">
                  <Map
                    className="h-100"
                    center={[40.732346, -74.0014247]}
                    circlePosition={[40.732346, -74.0014247]}
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
              
              
            </Col>

            <Col lg="4">
              <div
                style={{ top: "100px" }}
                className="p-4 shadow ms-lg-4 rounded sticky-top"
              >
                <p className="text-muted">
                  <span className="text-primary h2">
                    {data.price && data.price}
                  </span>{" "}
                  per night
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
                <p className="text-muted text-sm text-center">
                  Some additional text can be also placed here.
                </p>
                <hr className="my-4" />
                <div className="text-center">
                  <p>
                    <a href="#" className="text-secondary text-sm">
                      <FontAwesomeIcon icon={faHeart} />
                      &nbsp;Bookmark This Listing
                    </a>
                  </p>
                  <p className="text-muted text-sm">
                    79 people bookmarked this place{" "}
                  </p>
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

import PropTypes from "prop-types";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { BreadcrumbItem, Col, Row } from "reactstrap";

const Breadcrumb = (props) => {
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-0">{props.breadcrumbItem}</h4>

          {props.dateSelector && (
            <div className="page-title-center">
              <div className="row">
                <div className="col-md-6">
                  <DatePicker
                    selected={props.startDate}
                    onChange={(date) => {
                      props.setStartDate(date);
                      props.refresh();
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <DatePicker
                    selected={props.endDate}
                    onChange={(date) => {
                      props.setEndDate(date);
                      props.refresh();
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
};

export default Breadcrumb;

import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import IconButton from "../../components/IconButton";
import useRightNav from "./useRightNav";

const Navigation = ({ navSections }) => {
  const { close } = useRightNav();
  const [selectedSectionLink, setselectedSectionLink] = useState(
    "right-nav-section-0"
  );
  const [selectedSectionComponent, setselectedSectionComponent] = useState({});

  const prevSelectedSectionRef = useRef();

  useEffect(() => {
    setselectedSectionComponent({
      component: navSections[0].component,
      idx: 0,
    });
    prevSelectedSectionRef.current = selectedSectionComponent;
  }, []);

  useEffect(() => {
    let lastIndex = prevSelectedSectionRef.current.idx
      ? prevSelectedSectionRef.current.idx
      : 0;
    if (navSections.length === 1) {
      lastIndex = 0;
    }
    setselectedSectionComponent({
      component: navSections[lastIndex].component,
      idx: lastIndex,
    });
  }, [navSections]);

  return (
    <Wrapper>
      <nav>
        <IconButton
          className="btn-no-outline close-ic-btn"
          size="dash"
          name="x-circle"
          onClick={() => close()}
        />
      </nav>
      <div className="title-filters filter">
        {navSections.map((link, i) => {
          return (
            <a
              key={`right-nav-section-${i}`}
              className={`${
                selectedSectionLink == "right-nav-section-" + i ? "active" : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setselectedSectionLink(`right-nav-section-${i}`);
                setselectedSectionComponent({
                  component: link.component,
                  idx: i,
                });
                prevSelectedSectionRef.current = {
                  component: link.component,
                  idx: i,
                };
              }}
            >
              {link.title}
            </a>
          );
        })}
      </div>

      <div className="nav-content">{selectedSectionComponent.component}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 24px;

  .title-filters {
    border-bottom: 1px solid #edf1f7;
    padding-top: 37px;

    a {
      text-decoration: none;
      display: inline-block;
      font-weight: normal;
      text-align: left;
      color: #3e4857;
      padding-bottom: 0.5rem;
      font-size: 16px;
      line-height: 19px;
      margin-right: 40px;

      &.active {
        border-bottom: 3px solid #3e4857;
        color: #3e4857;
        font-weight: 600;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }

  .close-ic-btn {
    font-size: 20px;
    display: contents;
    color: #8f9bb3;
  }

  .nav-content {
    max-height: calc(100vh - 113px);

    overflow-y: auto;
    margin-right: -12px;
    padding-right: 12px;
    padding-top: 40px;
    padding-bottom: 40px;

    .section {
      padding-bottom: 24px;
      border-bottom: 1px solid #edf1f7;

      .section-header {
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #8f9bb3;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        button {
          font-size: 15px;
        }
      }

      .section-content {
        padding-top: 8px;

        p {
          font-size: 16px;
          line-height: 22px;
          color: #3e4857;
          margin: 0;
        }

        .team-participant {
          display: flex;
          align-items: baseline;
          padding: 5px 0px;
        }

        .team-header {
          margin: 16px 0;
        }
      }
    }

    &:hover::-webkit-scrollbar {
      width: 4px;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 0px;
      padding-left: 20px;
      margin-left: -10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: rgba(143, 155, 179, 0.15);
      box-shadow: 0px 4px 8px rgba(62, 72, 87, 0.04);
      border-radius: 4px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #8f9bb3;
      /* ShaOne */

      box-shadow: 0px 4px 8px rgba(62, 72, 87, 0.04);
      border-radius: 4px;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #6b7588;
      cursor: pointer;
    }
  }

  .project-title {
    text-transform: capitalize;
  }

  h6 {
    padding-bottom: 10px;
  }

  .section {
    margin-bottom: 20px;
  }

  .avatar-wrapper {
    margin-right: 12px;
  }
`;

Navigation.propTypes = {
  navSections: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.object])
        .isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navigation;

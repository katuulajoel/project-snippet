/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* -------------------------- Internal dependencies ------------------------- */
import DocumentForm from "./DocumentForm";

import { openModal } from "../utils/modals";
import Icon from "./Icon";
import { DOCUMENT_TYPES_MAP } from "../configs/constants/projectConstants";

const DocumentPicker = ({ onChange, showSelected, documentType }) => {
  const [documents, setdocuments] = useState([]);

  useEffect(() => {
    onChange(documents);
  }, [documents]);

  const onSelectDocument = () => {
    openModal({
      body: <DocumentForm id="document-form" />,
      title: `Add ${`${DOCUMENT_TYPES_MAP[documentType]}${
        documentType == "other" ? "s" : ""
      }`}`,
      options: {
        ok: "Add Document",
        form: {
          type: "submit",
          form: "document-form",
        },
      },
    }).then((document) => {
      setdocuments([...documents, { ...document, type: documentType }]);
    });
  };

  const onRemoveDoc = (idx) => {
    setdocuments([...documents.slice(0, idx), ...documents.slice(idx + 1)]);
  };

  return (
    <div className="document-input">
      {showSelected && documents.length > 0 && (
        <div className="file-list">
          {documents.map((doc, index) => {
            return (
              <div className="file-item" key={index}>
                <i className="tg-ic-file" /> {doc.title}{" "}
                {doc.file ? doc.file.name : doc.url}
                <button className="btn" onClick={() => onRemoveDoc(index)}>
                  <i className="tg-ic-close" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <a href="#" className="add-btn" onClick={() => onSelectDocument()}>
        <Icon name="round-add" size="sm" />
        &nbsp;&nbsp;Add New
      </a>
    </div>
  );
};

DocumentPicker.defaultProps = {
  showSelected: true,
};

DocumentPicker.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  documentType: PropTypes.string,
  showSelected: PropTypes.bool,
};

export default DocumentPicker;

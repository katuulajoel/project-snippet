/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */

import {
  DOC_TYPE_ESTIMATE,
  DOC_TYPE_OTHER,
  DOC_TYPE_PROPOSAL,
  DOC_TYPE_REQUIREMENTS,
  DOCUMENT_TYPES_MAP,
  DOC_TYPE_CONTRACT,
} from "../../../../configs/constants/projectConstants";

/* --------------------------- Component Dependencies -------------------------- */

import {
  createDocument,
  deleteDocument,
} from "../../../../redux/actions/ProjectActions";
import {
  isAdminOrClient,
  isDev,
  isPMAndHasProjectAcess,
} from "../../../../utils/auth";
import Icon from "../../../../components/Icon";
import IconButton from "../../../../components/IconButton";
import DocumentPicker from "../../../../components/DocumentPicker";

const Docs = ({ project }) => {
  const dispatch = useDispatch();
  const { documents: projectDocuments } = useSelector(
    ({ Projects }) => Projects
  );

  const [documents, setDocuments] = useState({
    estimate: [],
    proposal: [],
    requirements: [],
    contract: [],
    other: [],
  });

  const onChangeDocs = (key, docs) => {
    if (docs.length > documents[key].length) {
      let newDoc = docs[docs.length - 1];
      dispatch(
        createDocument({
          ...newDoc,
          project: { id: project.id },
        })
      );
    }

    let newState = {};
    newState[key] = docs;
    setDocuments({ ...documents, ...newState });
  };

  const onRemoveDoc = (id) => {
    dispatch(deleteDocument(id));
  };

  return (
    <div className="project-docs">
      {[
        ...(isDev() ? [] : [DOC_TYPE_PROPOSAL]),
        DOC_TYPE_REQUIREMENTS,
        ...(isDev() ? [] : [DOC_TYPE_ESTIMATE]),
        DOC_TYPE_CONTRACT,
        DOC_TYPE_OTHER,
      ].map((docType) => {
        return (
          <div key={`doc-type-${docType}`} className="section">
            <div className="section-title">
              <span>
                {(DOCUMENT_TYPES_MAP[docType] || _.upperFirst(docType)).replace(
                  /\s?document/,
                  ""
                )}{" "}
                {!(docType === DOC_TYPE_CONTRACT) ? "Documents" : null}
              </span>
              {(isAdminOrClient() || isPMAndHasProjectAcess(project)) &&
                !project.archived && (
                  <>
                    <DocumentPicker
                      showSelected={false}
                      documentType={docType}
                      onChange={(docs) => {
                        onChangeDocs(docType, docs);
                      }}
                    />{" "}
                  </>
                )}
            </div>

            <div
              className={`file-list ${
                !isDev() && !project.archived ? "" : "readonly"
              }`}
            >
              {projectDocuments
                .filter((doc) => doc.type === docType)
                .map((doc) => {
                  return (
                    <div
                      className="section-item"
                      key={`doc-${doc.id}`}
                      style={{ marginBottom: "16px" }}
                    >
                      <a
                        href={doc.download_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "auto" }}
                      >
                        <Icon
                          name={
                            doc.file ? "file-document-outline" : "link-variant"
                          }
                        />{" "}
                        {doc.title || "Document Name"}
                      </a>
                      {(isAdminOrClient() || isPMAndHasProjectAcess(project)) &&
                        !project.archived && (
                          <IconButton
                            name="delete-outline"
                            size="main"
                            className="btn-edit"
                            onClick={() => onRemoveDoc(doc.id)}
                          />
                        )}
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

Docs.propTypes = {
  project: PropTypes.object,
  ProjectActions: PropTypes.object,
};

export default Docs;

import React from "react";
import cx from "classnames";
import { AiOutlineDelete } from "react-icons/ai";
import Text from "./Text";

const InboxList = ({ inbox = [], onEdit, onDelete }) => {
  if (!inbox.length)
    return (
      <div className="list-group">
        <p className="list-group-item alert alert-light mb-0">
          Keine Posteinträge gefunden.
        </p>
      </div>
    );

  return (
    <div className="list-group">
      {inbox.map(
        ({ id, counter, datum, absender, type, recipient, isDisabled }) => {
          if (isDisabled) {
            return (
              <div
                className="list-group-item pt-0 pb-0"
                id={`inbox-row-${id}`}
                key={`inbox-row-${id}`}
                style={{
                  borderBottom: "1px solid lightgray",
                  lineHeight: "40px",
                  background: "rgb(249 249 249)",
                }}
              >
                <div className="row d-flex align-items-center">
                  <div className="col-1">
                    <i style={{ color: "rgb(207 207 207)" }}>{counter}</i>
                  </div>
                  <div className="col-2">
                    <i style={{ color: "rgb(207 207 207)" }}>{datum}</i>
                  </div>
                  <div className="col">
                    <i>
                      <Text text="Eintrag entfernt!" />
                    </i>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              className="list-group-item pt-0 pb-0"
              id={`inbox-row-${id}`}
              key={`inbox-row-${id}`}
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <div className="row d-flex align-items-center">
                <div className="col-1">{counter}</div>
                <div className="col-2">{datum}</div>
                <div className="col-3">
                  <Text text={absender} />
                </div>
                <div className="col-2" style={{ paddingLeft: "24px" }}>
                  <Text text={type} />
                </div>
                <div className="col-3" style={{ paddingLeft: "116px" }}>
                  <Text text={recipient} />
                </div>
                <div className="col-1">
                  <button
                    className={cx("btn", "btn-light")}
                    onClick={(event) => {
                      event.preventDefault();

                      onDelete([
                        ...new Map(
                          [
                            ...inbox,
                            {
                              id,
                              counter,
                              datum,
                              absender,
                              type,
                              isDisabled: true,
                            },
                          ].map((item) => [item.id, item])
                        ).values(),
                      ]);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default InboxList;

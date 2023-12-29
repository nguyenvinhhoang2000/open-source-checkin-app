import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";

import Edit from "@/components/icons/edit";
import Eye from "@/components/icons/eye";
import DropdownFilterTime from "@/components/layouts/dropDownFilterTime";

import { defaultItemFilterTime } from "@/constants/defaultItemFilterTime";
import { absentNumOfShow } from "@/constants/defaultPagination";
import { filterDataAbsent } from "@/utils/filterTime";
import { getDateOfNow } from "@/utils/getDateOfNow";

const dateOfNow = getDateOfNow();

const columns = [
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    width: "11.75rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "To",
    dataIndex: "to",
    key: "to",
    width: "11.75rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Date Request",
    dataIndex: "dateRequest",
    key: "dateRequest",
    width: "11.75rem",
    render: (text) => (
      <span className="font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "38.25rem",
    render: (text) => (
      <span className="line-clamp-2 min-w-[15rem] max-w-[38.25rem] text-ellipsis whitespace-pre-wrap font-roboto text-[0.875rem] font-[400] leading-[1.375rem]">
        {text}
      </span>
    ),
  },

  {
    title: "Action",
    key: "actions",
    width: "1%",
    render: (record) => {
      return (
        <Space>
          <Button title="view" type="link" icon={<Eye />} />

          {dateOfNow <= record.dateRequest.slice(0, 10) && (
            <Button title="edit" type="link" icon={<Edit />} />
          )}
        </Space>
      );
    },
  },
];

function AbsentTable(props) {
  const { dataAbsent } = props;

  const [dataAbsentFilter, setDataAbsentFilter] = useState([]);

  const [timeFilter, setTimeFilter] = useState(defaultItemFilterTime[0]?.key);

  const handleMenuClick = (e) => {
    setTimeFilter(e?.key);
  };

  const items = defaultItemFilterTime.map((item) => {
    return {
      key: item.key,

      label: (
        <span
          className={classNames(
            "font-roboto text-[0.875rem] leading-[1.375rem]",
            item.key === timeFilter ? "font-[500]" : "font-[400]",
          )}
        >
          {item.key}
        </span>
      ),
    };
  });

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    const newData = filterDataAbsent(timeFilter, dataAbsent);

    setDataAbsentFilter(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter]);

  return (
    <div className="container grid grid-cols-12 rounded-[0.5rem] bg-neutral-0 p-[1.25rem] shadow-tableShadow">
      <div className="col-span-12 flex w-full flex-col items-start justify-start gap-[1.25rem]">
        <div className="flex items-center justify-start self-stretch">
          <h4 className="mr-auto font-roboto text-[1.25rem] font-[500] leading-[1.75rem]">
            Your Absent Request
          </h4>

          <div className="flex items-center justify-end gap-[1rem]">
            <DropdownFilterTime menuProps={menuProps} timeFilter={timeFilter} />

            <Button title="Absent Request" type="primary">
              Absent Request
            </Button>
          </div>
        </div>

        <Table
          style={{ whiteSpace: "pre" }}
          pagination={{ pageSize: absentNumOfShow }}
          scroll={{
            x: "auto",
          }}
          rowKey="id"
          columns={columns}
          dataSource={dataAbsentFilter}
        />
      </div>
    </div>
  );
}

export default AbsentTable;

AbsentTable.propTypes = {
  dataAbsent: PropTypes.instanceOf(Array).isRequired,
};

import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { ColumnsType } from "antd/es/table";
import { Employee } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";

const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

export const Employees = () => {
const {data, isLoading} = useGetAllEmployeesQuery()
const navigate = useNavigate()
const user = useSelector(selectUser);

useEffect(() => {
  if (!user) {
    navigate("/login");
  }
}, [user, navigate]);

const gotToAddUser = () => navigate(Paths.employeeAdd);

  return (
    <Layout>
     <CustomButton type="primary" onClick={gotToAddUser} icon={<PlusCircleOutlined/>}>
        Добавить
    </CustomButton> 
    <Table
    loading = { isLoading }
    dataSource={data}
    pagination={false}
    rowKey={(record) => record.id}
    columns={columns}
    onRow={(record) => {
      return {
        onClick: () => navigate(`${Paths.employee}/${record.id}`),
      };
    }}
    />  
    </Layout>
  )
};
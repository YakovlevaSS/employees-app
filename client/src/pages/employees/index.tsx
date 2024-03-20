import { PlusCircleOutlined } from "@ant-design/icons";
import { CustomButton } from "../../components/custom-button";
import { Layout } from "../../components/layout";
import { Table } from "antd";
import { useGetAllEmployeesQuery } from "../../app/services/employees";


export const Employees = () => {
const {data, isLoading} = useGetAllEmployeesQuery()

  return (
    <Layout>
     <CustomButton type="primary" onClick={() => null} icon={<PlusCircleOutlined/>}>
        Добавить
    </CustomButton> 
    <Table
    loading = { isLoading }
    dataSource={data}
    pagination={false}
    />  
    </Layout>
  )
};
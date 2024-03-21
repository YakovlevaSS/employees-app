import { Row } from "antd";
import { EmployeeForm } from "../../components/employee-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useGetEmployeeQuery, useEditEmployeeMutation} from "../../app/services/employees";
import { Employee } from "@prisma/client";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { Paths } from "../../paths";
import { Layout } from "../../components/layout";

export const EditEmployee = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return <span>Загрузка</span>
  }

  const handleAddEmployee = async (employee: Employee) => {
    try {
        const editedEmployee = {
            ...data,
            ...employee
          };
    
          await editEmployee(editedEmployee).unwrap();

      navigate(`${Paths.status}/created`);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          onFinish={handleAddEmployee}
          title="Редактировать сотрудника"
          employee={data}
          btnText="Редактировать"
          error={ error }
        />
      </Row>
    </Layout>
  );
};

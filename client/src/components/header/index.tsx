import { Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import { TeamOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { CustomButton } from "../custom-button";
import { Paths } from "../../paths";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="text">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton type="text" icon={ <UserOutlined/> }>
            Зарегистрироваться
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton type="text" icon={ <LoginOutlined/> }>
            Войти
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};

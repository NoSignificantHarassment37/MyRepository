type UserInfoParams = {
  nombre: string;
  email: string;
};
export default function UserInfo({ nombre, email }: UserInfoParams) {
  return (
    <>
      <p>
        {nombre}, {email}
      </p>
    </>
  );
}

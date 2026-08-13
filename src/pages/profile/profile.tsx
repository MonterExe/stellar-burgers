import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../services/profileSlice';
import { ProfileUI } from '../../components/ui/pages/profile';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue((prev) => ({
        ...prev,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      const data: { name?: string; email?: string; password?: string } = {};
      if (formValue.name !== user?.name) data.name = formValue.name;
      if (formValue.email !== user?.email) data.email = formValue.email;
      if (formValue.password) data.password = formValue.password;
      dispatch(updateUser(data))
        .unwrap()
        .catch(console.error);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

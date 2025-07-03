import { Layout } from '@/components/Layout';
import { useMyAccount } from '@/services/hooks';

const SelectReceiveAccount = () => {
  const { data } = useMyAccount();
  console.log(data);
  return <Layout />;
};

export default SelectReceiveAccount;

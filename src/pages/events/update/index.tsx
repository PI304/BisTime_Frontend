import { useRouter } from 'next/router';
import Layout from '@components/common/layout';
import Button from '@components/common/button';
import Input from '@components/common/input';
import { useForm } from 'react-hook-form';
interface UserForm {
  name: string;
  password: string;
}

function Update() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserForm>({});

  const onSubmit = (form: UserForm) => {
    const { name, password } = form;
    if (name && password) router.push('/events/update/schedule');
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center h-full">
        <div className="w-full flex flex-col items-center justify-center mb-16">
          <h1 className="text-h2 font-bold text-center text-base-black">
            Event's Name
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-full">
            <Input
              islabel
              label="Name"
              name="name"
              placeholder="Enter your name"
              height="lg"
              register={register('name', {
                required: true,
                maxLength: 100,
                minLength: 1,
              })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                This field is required
              </p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                Max length is 100
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <Input
              islabel
              label="Password"
              name="password"
              placeholder="password"
              height="lg"
              register={register('password', {
                required: true,
                maxLength: 100,
                minLength: 1,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                This field is required
              </p>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <p className="w-full mt-2 text-left text-system-error text-xs">
                Max length is 100
              </p>
            )}
          </div>
          <Button size="lg" className="mt-8">
            Next
          </Button>
        </form>
      </div>
    </Layout>
  );
}
export default Update;

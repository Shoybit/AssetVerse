import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router';

export default function Register() {
  const { register: registerApi } = useContext(AuthContext);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: { role: 'employee' }
  });
  const role = watch('role');
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // clear server error when role changes
    setServerError(null);
  }, [role]);

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      // normalize role & required HR fields
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        role: data.role,
        profileImage: data.profileImage || null,
      };

      if (data.role === 'hr') {
        payload.companyName = data.companyName;
        payload.companyLogo = data.companyLogo || null;
      }

      const res = await registerApi(payload);
      const user = res.user;
      if (user?.role === 'hr') nav('/hr/assets');
      else nav('/my-assets');
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Registration failed';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">Create an account</h2>

          {serverError && (
            <div className="alert alert-error mb-3">
              <div>{serverError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label"><span className="label-text">Full name</span></label>
              <input {...register('name', { required: 'Full name is required' })} className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`} />
              {errors.name && <p className="text-sm text-error mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label"><span className="label-text">Email</span></label>
              <input {...register('email', { required: 'Email required' })} type="email" className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="label"><span className="label-text">Password</span></label>
                <input {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })} type="password" className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`} />
                {errors.password && <p className="text-sm text-error mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="label"><span className="label-text">Date of birth</span></label>
                <input {...register('dateOfBirth', { required: 'DOB required' })} type="date" className={`input input-bordered w-full ${errors.dateOfBirth ? 'input-error' : ''}`} />
                {errors.dateOfBirth && <p className="text-sm text-error mt-1">{errors.dateOfBirth.message}</p>}
              </div>
            </div>

            <div>
              <label className="label"><span className="label-text">I am a</span></label>
              <select {...register('role')} className="select select-bordered w-full">
                <option value="employee">Employee</option>
                <option value="hr">HR Manager</option>
              </select>
            </div>

            {role === 'hr' && (
              <>
                <div>
                  <label className="label"><span className="label-text">Company name</span></label>
                  <input {...register('companyName', { required: role === 'hr' ? 'Company name required' : false })} className={`input input-bordered w-full ${errors.companyName ? 'input-error' : ''}`} />
                  {errors.companyName && <p className="text-sm text-error mt-1">{errors.companyName.message}</p>}
                </div>

                <div>
                  <label className="label"><span className="label-text">Company logo URL (optional)</span></label>
                  <input {...register('companyLogo')} placeholder="https://..." className="input input-bordered w-full" />
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <button className={`btn btn-primary ${loading ? 'loading' : ''}`} type="submit" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => { /* go back to home quickly */ window.location.href = '/'; }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

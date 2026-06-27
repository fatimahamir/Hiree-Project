import { useState, useEffect } from 'react';
import API from '../../api/axiosConfig';

const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await API.get('/services?provider=me');
      setServices(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData) => {
    try {
      const res = await API.post('/services', serviceData);
      setServices([...services, res.data]);
      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to create service' 
      };
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      const res = await API.put(`/services/${id}`, serviceData);
      setServices(services.map(s => s._id === id ? res.data : s));
      return { success: true, data: res.data };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to update service' 
      };
    }
  };

  const deleteService = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      setServices(services.filter(s => s._id !== id));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: err.response?.data?.message || 'Failed to delete service' 
      };
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
    refetch: fetchServices,
  };
};

export default useServices;
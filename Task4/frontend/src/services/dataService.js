// src/services/dataService.js
import api from './api';

// Вспомогательная функция для нормализации имен полей
// Преобразует snake_case (из бэкенда) в camelCase для использования в JS
const normalizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => normalizeData(item));
  }
  if (data && typeof data === 'object') {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
        newData[camelCaseKey] = normalizeData(data[key]); // Рекурсивно для вложенных объектов/массивов
      }
    }
    return newData;
  }
  return data;
};

// --- Функции для GET-запросов ---
export const fetchBuildings = async () => {
  const response = await api.get('/api/buildings');
  return normalizeData(response.data); // Нормализуем данные
};
export const fetchSensors = async () => {
  const response = await api.get('/api/sensors');
  return normalizeData(response.data);
};
export const fetchOffices = async () => {
  const response = await api.get('/api/offices');
  return normalizeData(response.data);
};
export const fetchMeasurements = async () => {
  const response = await api.get('/api/measurements');
  return normalizeData(response.data);
};
export const fetchSubscriptions = async () => {
  const response = await api.get('/api/subscriptions');
  // Для подписок, так как модель Subscription не имеет user_id и notification_type,
  // мы должны ожидать sensor_id и callback_url
  // Если в модели Subscription.js на бэкенде появятся user_id/notification_type,
  // нужно будет добавить их в normalizeData
  return normalizeData(response.data);
};

// --- Функции для POST-запросов ---
// Отправляем данные как есть, бэкенд ожидает camelCase/snake_case в зависимости от вашей модели
export const createBuilding = (data) => api.post('/api/buildings', data);
export const createSensor = (data) => api.post('/api/sensors', data);
export const createOffice = (data) => api.post('/api/offices', data);
export const createMeasurement = (data) => api.post('/api/measurements', data);
export const createSubscription = (data) => api.post('/api/subscriptions', data);

// --- Функции для PUT-запросов ---
export const updateBuilding = (id, data) => api.put(`/api/buildings/${id}`, data);
export const updateSensor = (id, data) => api.put(`/api/sensors/${id}`, data);
export const updateOffice = (id, data) => api.put(`/api/offices/${id}`, data);
export const updateMeasurement = (id, data) => api.put(`/api/measurements/${id}`, data);
export const updateSubscription = (id, data) => api.put(`/api/subscriptions/${id}`, data);

// --- Функции для DELETE-запросов ---
export const deleteBuilding = (id) => api.delete(`/api/buildings/${id}`);
export const deleteSensor = (id) => api.delete(`/api/sensors/${id}`);
export const deleteOffice = (id) => api.delete(`/api/offices/${id}`);
export const deleteMeasurement = (id) => api.delete(`/api/measurements/${id}`);
export const deleteSubscription = (id) => api.delete(`/api/subscriptions/${id}`);


// Объект-маппер для удобного вызова GET
export const dataFetchers = {
  buildings: fetchBuildings,
  sensors: fetchSensors,
  offices: fetchOffices,
  measurements: fetchMeasurements,
  subscriptions: fetchSubscriptions,
};

// Объект-маппер для удобного вызова CREATE
export const dataCreators = {
    buildings: createBuilding,
    sensors: createSensor,
    offices: createOffice,
    measurements: createMeasurement,
    subscriptions: createSubscription,
};

// Объект-маппер для удобного вызова UPDATE
export const dataUpdaters = {
  buildings: updateBuilding,
  sensors: updateSensor,
  offices: updateOffice,
  measurements: updateMeasurement,
  subscriptions: updateSubscription,
};

// Объект-маппер для удобного вызова DELETE
export const dataDeleters = {
  buildings: deleteBuilding,
  sensors: deleteSensor,
  offices: deleteOffice,
  measurements: deleteMeasurement,
  subscriptions: deleteSubscription,
};
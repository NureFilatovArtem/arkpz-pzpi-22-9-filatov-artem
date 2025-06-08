// src/pages/Admin/DataManagementPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox, TextField,
  CircularProgress, Alert, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Collapse, Grid, Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Select, // <-- 1. ДОБАВЛЕН НЕДОСТАЮЩИЙ ИМПОРТ
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


import { 
  dataFetchers, 
  dataCreators, 
  dataUpdaters, 
  dataDeleters,
  fetchBuildings, // Для выпадающих списков
  fetchSensors, // Для выпадающих списков
  fetchOffices // Для выпадающих списков
} from '../../services/dataService'; // Используем наш сервис

// Конфигурация таблиц и их полей (важно: имена полей в camelCase, как их возвращает бэкенд)
const tableConfigs = {
  buildings: { 
    label: 'Buildings', 
    columns: [
      { id: 'id', label: 'ID', isId: true }, 
      { id: 'name', label: 'Name', isSearchable: true }, 
      { id: 'address', label: 'Address', isSearchable: true }
    ],
    formFields: [
      { id: 'name', label: 'Name', type: 'text', required: true },
      { id: 'address', label: 'Address', type: 'text', required: true },
    ]
  },
  sensors: { 
    label: 'Sensors', 
    columns: [
      { id: 'id', label: 'ID', isId: true }, 
      { id: 'type', label: 'Type', isSearchable: true }, 
      { id: 'buildingId', label: 'Building ID', isId: true },
      { id: 'officeId', label: 'Office ID', isId: true } // Добавил officeId, если есть
    ],
    formFields: [
      { id: 'type', label: 'Type', type: 'text', required: true },
      { id: 'buildingId', label: 'Building ID', type: 'select', options: [], required: true, dependsOn: 'buildings' }, // Динамические опции
      { id: 'officeId', label: 'Office ID', type: 'select', options: [], required: false, dependsOn: 'offices' },
    ]
  },
  offices: { 
    label: 'Offices', 
    columns: [
      { id: 'id', label: 'ID', isId: true }, 
      { id: 'name', label: 'Name', isSearchable: true }, 
      { id: 'location', label: 'Location', isSearchable: true },
      { id: 'buildingId', label: 'Building ID', isId: true }
    ],
    formFields: [
      { id: 'name', label: 'Name', type: 'text', required: true },
      { id: 'location', label: 'Location', type: 'text', required: true },
      { id: 'buildingId', label: 'Building ID', type: 'select', options: [], required: true, dependsOn: 'buildings' },
    ]
  },
  measurements: { 
    label: 'Measurements', 
    columns: [
      { id: 'id', label: 'ID', isId: true }, 
      { id: 'sensorId', label: 'Sensor ID', isId: true }, 
      { id: 'value', label: 'Value' }, 
      { id: 'unit', label: 'Unit', isSearchable: true },
      { id: 'timestamp', label: 'Timestamp' }
    ],
    formFields: [
      { id: 'sensorId', label: 'Sensor ID', type: 'select', options: [], required: true, dependsOn: 'sensors' },
      { id: 'value', label: 'Value', type: 'number', required: true },
      { id: 'unit', label: 'Unit', type: 'text', required: true },
      { id: 'timestamp', label: 'Timestamp', type: 'datetime-local', required: false }
    ]
  },
  subscriptions: { 
    label: 'Subscriptions', 
    columns: [
      { id: 'id', label: 'ID', isId: true }, 
      { id: 'sensorId', label: 'Sensor ID', isId: true }, 
      { id: 'callbackUrl', label: 'Callback URL', isSearchable: true }, // Изменено с notification_type
      { id: 'createdAt', label: 'Created At' }
    ],
    formFields: [
      { id: 'sensorId', label: 'Sensor ID', type: 'select', options: [], required: true, dependsOn: 'sensors' },
      { id: 'callbackUrl', label: 'Callback URL', type: 'text', required: true },
      // user_id здесь нет, если он не определен в модели Subscription
    ]
  },
};

// Компонент для отображения таблицы
const DynamicDataTable = ({ title, data, columns, loading, error, onEdit, onDelete }) => {
  return (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom component="div">
          {title}
        </Typography>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && (
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
                            {columns.map(col => <TableCell key={col.id} sx={{ fontWeight: 'bold' }}>{col.label || col.id.toUpperCase()}</TableCell>)}
                            <TableCell sx={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map(col => (
                                  <TableCell key={`${row.id}-${col.id}`}>
                                    {col.id === 'timestamp' || col.id === 'createdAt' ? new Date(row[col.id]).toLocaleString() : String(row[col.id])}
                                  </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton size="small" color="primary" onClick={() => onEdit && onEdit(row)}><EditIcon fontSize="inherit" /></IconButton>
                                    <IconButton size="small" color="error" onClick={() => onDelete && onDelete(row)}><DeleteIcon fontSize="inherit" /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {data.length === 0 && <TableRow><TableCell colSpan={columns.length + 1} align="center">No data available.</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        )}
    </Box>
  );
};

const DataManagementPage = () => {
  const { t } = useTranslation();
  const [selectedTables, setSelectedTables] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  // Состояния для модального окна добавления
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalType, setAddModalType] = useState(''); // Тип сущности для добавления (e.g., 'buildings')
  const [addForm, setAddForm] = useState({});
  const [addFormLoading, setAddFormLoading] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState('');

  // Состояние для дополнительных данных для select-ов в формах (например, список зданий для сенсоров)
  const [relatedData, setRelatedData] = useState({});

  // Загрузка связанных данных для форм (зданий, офисов, сенсоров)
  useEffect(() => {
    const loadRelatedData = async () => {
      try {
        const [buildingsRes, sensorsRes, officesRes] = await Promise.all([
          fetchBuildings(),
          fetchSensors(),
          fetchOffices(),
        ]);
        setRelatedData({
          buildings: buildingsRes,
          sensors: sensorsRes,
          offices: officesRes,
        });
      } catch (err) {
        console.error("Failed to load related data for forms:", err);
      }
    };
    loadRelatedData();
  }, []); // Загружаем один раз при монтировании

  const fetchData = useCallback(async (key) => {
    if (loading[key]) return;

    setLoading(prev => ({ ...prev, [key]: true }));
    setErrors(prev => ({ ...prev, [key]: null }));
    
    try {
      const response = await dataFetchers[key]();
      setData(prev => ({ ...prev, [key]: response })); // response.data уже обработан normalizeData в dataService
    } catch (err) {
      setErrors(prev => ({ ...prev, [key]: err?.response?.data?.message || `Failed to load ${key}` }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [loading]); // fetchData зависит только от loading

  // Загрузка данных при изменении выбранных таблиц
  useEffect(() => {
    Object.keys(selectedTables).forEach(key => {
      if (selectedTables[key] && !data[key] && !loading[key]) { // Добавлено !loading[key]
        fetchData(key);
      }
    });
  }, [selectedTables, data, loading, fetchData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedTables(prev => ({
      ...prev,
      [name]: checked,
    }));
    // Если снят чекбокс, очищаем данные для этой таблицы, чтобы они перезагрузились при повторном выборе
    if (!checked) {
      setData(prev => {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      });
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedFilter = searchTerm.toLowerCase().trim();
    
    const filtered = {};
    Object.keys(data).forEach(key => {
      if (data[key]) {
        filtered[key] = data[key].filter(item => 
          tableConfigs[key].columns.some(col => { // Проверяем только по столбцам, которые можно искать
            if (col.isSearchable || col.isId) { // Если колонка текстовая или ID
              const value = String(item[col.id]);
              if (col.isId && !isNaN(lowercasedFilter)) { // Для ID-полей ищем точное совпадение или startWith
                return value.startsWith(lowercasedFilter);
              }
              return value.toLowerCase().includes(lowercasedFilter);
            }
            return false;
          })
        );
      }
    });
    return filtered;
  }, [searchTerm, data]);

  // --- Функции для модального окна добавления ---
  const handleOpenAddModal = (type) => {
    setAddModalType(type);
    // Инициализируем форму с дефолтными значениями, если они есть
    const initialForm = {};
    tableConfigs[type].formFields.forEach(field => {
      initialForm[field.id] = field.type === 'number' ? 0 : (field.type === 'select' ? '' : '');
    });
    setAddForm(initialForm);
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setAddModalType('');
    setAddForm({});
    setAddError('');
    setAddSuccess('');
    setAddFormLoading(false);
  };

  const handleAddFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmitAdd = async () => {
    setAddFormLoading(true);
    setAddError('');
    setAddSuccess('');

    try {
      if (dataCreators[addModalType]) {
        await dataCreators[addModalType](addForm);
        setAddSuccess(`Successfully added ${addModalType} record.`);
        handleCloseAddModal();
        fetchData(addModalType); // Перезагрузить данные для обновленной таблицы
      } else {
        throw new Error('Creator function not found for this type.');
      }
    } catch (err) {
      setAddError(err?.response?.data?.message || err?.message || `Failed to add ${addModalType} record.`);
    } finally {
      setAddFormLoading(false);
    }
  };

  const renderFormFields = (type) => {
    if (!tableConfigs[type]) return null;

    return tableConfigs[type].formFields.map(field => {
      if (field.type === 'select' && field.dependsOn && relatedData[field.dependsOn]) {
        const options = relatedData[field.dependsOn].map(item => ({
          value: item.id,
          label: item.name || item.id, // Предполагаем, что у сущностей есть name или id
        }));
        return (
          <FormControl fullWidth key={field.id} margin="normal">
            <InputLabel>{field.label}</InputLabel>
            <Select
              name={field.id}
              value={addForm[field.id] || ''}
              onChange={handleAddFormChange}
              label={field.label}
              required={field.required}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      return (
        <TextField
          key={field.id}
          label={field.label}
          name={field.id}
          type={field.type === 'number' ? 'number' : field.type} // Обработка 'datetime-local' или других типов
          value={addForm[field.id] || ''}
          onChange={handleAddFormChange}
          required={field.required}
          fullWidth
          margin="normal"
          // Для datetime-local нужно форматирование
          {...(field.type === 'datetime-local' && { InputLabelProps: { shrink: true } })}
        />
      );
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t('dataManagement.title', 'Data Management')}
      </Typography>
      
      {/* --- ИСПРАВЛЕННЫЙ БЛОК ПАНЕЛИ УПРАВЛЕНИЯ --- */}
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }} elevation={2}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          
          {/* Блок с чекбоксами слева */}
          <Grid item xs={12} lg={8}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              {t('dataManagement.selectData', 'SELECT DATA TO DISPLAY:')}
            </Typography>
            <FormGroup row sx={{ flexWrap: 'wrap' }}>
              {Object.keys(tableConfigs).map((key) => (
                <FormControlLabel
                  key={key}
                  control={<Checkbox checked={!!selectedTables[key]} onChange={handleCheckboxChange} name={key} />}
                  label={t(`dataManagement.tables.${key}`, tableConfigs[key].label)}
                  sx={{ mr: 2 }}
                />
              ))}
            </FormGroup>
          </Grid>
          
          {/* Блок с поиском и кнопкой справа */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder={t('dataManagement.searchPlaceholder', 'Search...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenAddModal(Object.keys(selectedTables).find(key => selectedTables[key]) || 'buildings')}
                  sx={{ whiteSpace: 'nowrap' }} // Предотвращает перенос текста на кнопке
                >
                  {t('dataManagement.addRecord', 'Add Record')}
                </Button>
            </Box>
          </Grid>

        </Grid>
      </Paper>
      
      <Box>
        {Object.keys(tableConfigs).map((key) => (
          <Collapse in={!!selectedTables[key]} key={key}>
            <DynamicDataTable
              title={t(`dataManagement.tables.${key}`, tableConfigs[key].label)}
              data={filteredData[key] || []}
              columns={tableConfigs[key].columns}
              loading={loading[key]}
              error={errors[key]}
              // TODO: Implement onEdit and onDelete handlers to open edit/delete modals
              onEdit={(row) => alert(`Edit ${key} ID: ${row.id}`)}
              onDelete={(row) => alert(`Delete ${key} ID: ${row.id}`)}
            />
          </Collapse>
        ))}
      </Box>

      {/* Модальное окно добавления записи */}
      <Dialog open={isAddModalOpen} onClose={handleCloseAddModal} maxWidth="sm" fullWidth>
        <DialogTitle>{t('dataManagement.addRecordTitle', `Add New ${tableConfigs[addModalType]?.label || 'Record'}`)}</DialogTitle>
        <DialogContent>
          {renderFormFields(addModalType)}
          {addError && <Alert severity="error" sx={{ mt: 2 }}>{addError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>{t('userManagement.actions.cancel', 'Cancel')}</Button>
          <Button onClick={handleSubmitAdd} variant="contained" disabled={addFormLoading} color="primary">
            {addFormLoading ? <CircularProgress size={24} /> : t('userManagement.actions.add', 'Add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataManagementPage;
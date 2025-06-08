import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Box, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert
} from '@mui/material';
import { useTranslation } from 'react-i18next';
// Все импорты работают, dataService остается без изменений
import { fetchBuildings, fetchSensors, fetchMeasurements } from '../services/dataService';

// Вспомогательный компонент для таблицы (оставляем без изменений)
const ReadOnlyDataTable = ({ title, data, columns, loading, noDataText }) => {
    if (loading) {
      return (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress size={28} /></Box>
        </Box>
      );
    }
    if (!data || data.length === 0) return null;
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                            {columns.map(col => <TableCell key={col.key} sx={{ fontWeight: 'bold' }}>{col.header}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id} hover>
                                {columns.map(col => <TableCell key={col.key}>{col.isDate ? new Date(row[col.key]).toLocaleString() : String(row[col.key] ?? 'N/A')}</TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};


const UserDataViewPage = () => {
  const { t } = useTranslation();
  const [buildings, setBuildings] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  
  const [loading, setLoading] = useState({ buildings: true, sensors: true, measurements: true });
  const [error, setError] = useState('');
  
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedSensor, setSelectedSensor] = useState('');

  // Загружаем все данные при монтировании компонента
  useEffect(() => {
    const loadAllData = async () => {
        setError('');
        try {
            // --- ГЛАВНОЕ ИСПРАВЛЕНИЕ: МЫ ПОЛУЧАЕМ УЖЕ ГОТОВЫЙ МАССИВ, А НЕ response ---
            const buildingsData = await fetchBuildings();
            setBuildings(buildingsData || []);
            setLoading(p => ({...p, buildings: false}));
            
            const sensorsData = await fetchSensors();
            setSensors(sensorsData || []);
            setLoading(p => ({...p, sensors: false}));
            
            const measurementsData = await fetchMeasurements();
            setMeasurements(measurementsData || []);
            setLoading(p => ({...p, measurements: false}));

        } catch (err) {
            setError('Failed to load data.');
            setLoading({ buildings: false, sensors: false, measurements: false });
        }
    };
    loadAllData();
  }, []); // Пустой массив, выполняется один раз

  // Фильтры
  const sensorsInBuilding = useMemo(() => {
    if (!selectedBuilding) return sensors; // Если здание не выбрано, показываем все
    return sensors.filter(s => s.buildingId === selectedBuilding);
  }, [selectedBuilding, sensors]);
  
  const measurementsForSensor = useMemo(() => {
    if (!selectedSensor) return []; // Не показываем, если сенсор не выбран
    return measurements.filter(m => m.sensorId === selectedSensor);
  }, [selectedSensor, measurements]);
  
  useEffect(() => {
    const sensorExists = sensorsInBuilding.some(s => s.id === selectedSensor);
    if (selectedSensor && !sensorExists) {
        setSelectedSensor('');
    }
  }, [selectedBuilding, sensorsInBuilding, selectedSensor]);
  
  if (Object.values(loading).some(Boolean) && buildings.length === 0) {
      return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
  }
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Data View</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Filters</Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel id="b-label">Filter by Building</InputLabel>
                    <Select labelId="b-label" value={selectedBuilding} onChange={e => setSelectedBuilding(e.target.value)} label="Filter by Building">
                        <MenuItem value=""><em>Show All Buildings</em></MenuItem>
                        {buildings.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={sensors.length === 0}>
                    <InputLabel id="s-label">Filter by Sensor</InputLabel>
                    <Select labelId="s-label" value={selectedSensor} onChange={e => setSelectedSensor(e.target.value)} label="Filter by Sensor">
                        <MenuItem value=""><em>Select a Sensor to see Measurements</em></MenuItem>
                        {sensorsInBuilding.map(s => <MenuItem key={s.id} value={s.id}>{s.type} (ID: {s.id})</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
      </Paper>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <ReadOnlyDataTable 
                title="Buildings" 
                data={buildings} 
                columns={[{key: 'id', header: 'ID'}, {key: 'name', header: 'Name'}]}
                loading={loading.buildings}
            />
        </Grid>
        <Grid item xs={12} md={6}>
            <ReadOnlyDataTable 
                title="Sensors" 
                data={sensorsInBuilding}
                columns={[{key: 'id', header: 'ID'}, {key: 'type', header: 'Type'}]}
                loading={loading.sensors}
            />
        </Grid>
      </Grid>
      
      {/* Показываем измерения только если выбран сенсор */}
      {selectedSensor && (
          <ReadOnlyDataTable 
              title={`Measurements for Sensor #${selectedSensor}`} 
              data={measurementsForSensor}
              columns={[{key: 'value', header: 'Value'}, {key: 'timestamp', header: 'Timestamp', isDate: true}]}
              loading={loading.measurements}
          />
      )}
    </Box>
  );
};

export default UserDataViewPage;
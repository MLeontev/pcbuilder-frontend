import { AxiosResponse } from 'axios';
import api from '../http';
import { GenerateBuildReportRequest } from '../types/builds/GenerateBuildReportRequest';

export default class reportService {
  static async generateExcelReport(
    request: GenerateBuildReportRequest
  ): Promise<AxiosResponse<Blob>> {
    console.log('request', request);
    return await api.post('/build/generate-excel-report', request, {
      responseType: 'blob',
    });
  }

  static async generatePdfReport(
    request: GenerateBuildReportRequest
  ): Promise<AxiosResponse<Blob>> {
    console.log('request', request);
    return await api.post('/build/generate-pdf-report', request, {
      responseType: 'blob',
    });
  }
}

import { useMutation } from '@tanstack/react-query';
import reportService from '../../services/reportService';
import { GenerateBuildReportRequest } from '../../types/builds/GenerateBuildReportRequest';

const useGeneratePdfReport = () => {
  return useMutation({
    mutationFn: async (request: GenerateBuildReportRequest) => {
      const response = await reportService.generatePdfReport(request);
      return response.data;
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'BuildReport.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useGeneratePdfReport;

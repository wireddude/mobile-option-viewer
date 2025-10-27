
export const formatCurrency = (value: number, sign: string = '$'): string => {
    return `${sign}${value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };
  
  export const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  export const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
  };

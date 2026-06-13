import { useEffect, useState } from 'react';

import { Modal } from '@components/modal/modal';
import { Button } from '@components/ui/button';

import type { Portfolio } from '@lib/types/portfolio';

type PortfolioModalProps = {
  open: boolean;
  closeModal: () => void;
  portfolio?: Portfolio | null;
  selectedType?: Portfolio['type'];
};

type FormData = {
  type: Portfolio['type'];
  title: string;
  role: string;
  location: string;
  companyUrl: string;
  startDate: string;
  endDate: string;
  descriptions: string;
  order: number;
};

const defaultForm: FormData = {
  type: 'experience',
  title: '',
  role: '',
  location: '',
  companyUrl: '',
  startDate: '',
  endDate: '',
  descriptions: '',
  order: 1
};

export function PortfolioModal({
  open,
  closeModal,
  portfolio,
  selectedType
}: PortfolioModalProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormData>(defaultForm);

  useEffect(() => {
    if (portfolio) {
      setForm({
        type: portfolio.type,
        title: portfolio.title,
        role: portfolio.role,
        location: portfolio.location,
        companyUrl: portfolio.companyUrl ?? '',
        startDate: portfolio.startDate,
        endDate: portfolio.endDate,
        descriptions: portfolio.descriptions.join('\n'),
        order: portfolio.order
      });
      return;
    }

    setForm({
      ...defaultForm,
      type: selectedType ?? defaultForm.type
    });
  }, [portfolio, selectedType]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    const { name, value } = e.target;

    setForm((prev) => {
      const nextType =
        name === 'type' ? (value as Portfolio['type']) : prev.type;
      const updated = {
        ...prev,
        [name]: name === 'order' ? Number(value) : value
      } as FormData;

      if (name === 'type') {
        return {
          ...updated,
          type: nextType,
          descriptions: nextType === 'training' ? '' : updated.descriptions,
          startDate: nextType === 'training' ? '' : updated.startDate,
          location: nextType === 'training' ? '' : updated.location,
          companyUrl: nextType === 'training' ? '' : updated.companyUrl
        };
      }

      return updated;
    });
  }

  async function handleSubmit(): Promise<void> {
    try {
      setLoading(true);

      const payload = {
        ...form,
        descriptions: form.descriptions
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean)
      };

      const response = await fetch(
        portfolio ? `/api/portfolio/${portfolio.id}` : '/api/portfolio',
        {
          method: portfolio ? 'PATCH' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'same-origin',
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `Failed to save portfolio: ${response.status} ${errorBody}`
        );
      }

      window.location.reload();
    } catch (error) {
      alert('Failed to save portofolio');
    } finally {
      setLoading(false);
    }
  }

  const typeSettings: Record<
    Portfolio['type'],
    {
      typeLabel: string;
      titleLabel: string;
      roleLabel: string;
      locationLabel?: string;
      companyUrlLabel?: string;
      startDateLabel?: string;
      endDateLabel: string;
      descriptionsLabel?: string;
      showLocation: boolean;
      showCompanyUrl: boolean;
      showStartDate: boolean;
      showDescriptions: boolean;
    }
  > = {
    experience: {
      typeLabel: 'Experience',
      titleLabel: 'Company Name',
      roleLabel: 'Role',
      locationLabel: 'Location',
      companyUrlLabel: 'Company URL',
      startDateLabel: 'Start Date',
      endDateLabel: 'End Date',
      descriptionsLabel: 'Jobdesk / Responsibilities',
      showLocation: true,
      showCompanyUrl: true,
      showStartDate: true,
      showDescriptions: true
    },
    education: {
      typeLabel: 'Education',
      titleLabel: 'Institution',
      roleLabel: 'Degree / Major',
      locationLabel: 'Location',
      companyUrlLabel: 'Institution Website',
      startDateLabel: 'Start Date',
      endDateLabel: 'Graduation Date',
      descriptionsLabel: 'GPA / Thesis / Notes',
      showLocation: true,
      showCompanyUrl: true,
      showStartDate: true,
      showDescriptions: true
    },
    project: {
      typeLabel: 'Project',
      titleLabel: 'Project Name',
      roleLabel: 'Technology / Framework',
      locationLabel: 'Optional Location',
      companyUrlLabel: 'Project URL',
      startDateLabel: 'Start Date',
      endDateLabel: 'End Date',
      descriptionsLabel: 'Feature Details',
      showLocation: true,
      showCompanyUrl: true,
      showStartDate: true,
      showDescriptions: true
    },
    training: {
      typeLabel: 'Training',
      titleLabel: 'Certification Name',
      roleLabel: 'Organizer',
      companyUrlLabel: 'Organizer Website',
      endDateLabel: 'Year',
      showLocation: false,
      showCompanyUrl: true,
      showStartDate: false,
      showDescriptions: false
    }
  };

  const currentSettings = typeSettings[form.type];

  return (
    <Modal
      open={open}
      closeModal={closeModal}
      modalClassName='w-full max-w-2xl rounded-xl bg-white p-6 dark:bg-gray-900'
    >
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold'>
          {portfolio
            ? `Edit ${currentSettings.typeLabel}`
            : `Add ${currentSettings.typeLabel}`}
        </h2>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div>
            <label className='block text-sm font-medium mb-1'>Type</label>
            <select
              className='custom-input w-full'
              name='type'
              value={form.type}
              onChange={handleChange}
            >
              <option value='experience'>Experience</option>
              <option value='education'>Education</option>
              <option value='project'>Project</option>
              <option value='training'>Training</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Order</label>
            <input
              className='custom-input w-full'
              type='number'
              name='order'
              placeholder='Order'
              value={form.order}
              onChange={handleChange}
            />
          </div>
        </div>

        <input
          className='custom-input w-full'
          name='title'
          placeholder={currentSettings.titleLabel}
          value={form.title}
          onChange={handleChange}
        />

        <input
          className='custom-input w-full'
          name='role'
          placeholder={currentSettings.roleLabel}
          value={form.role}
          onChange={handleChange}
        />

        {currentSettings.showLocation && (
          <input
            className='custom-input w-full'
            name='location'
            placeholder={currentSettings.locationLabel}
            value={form.location}
            onChange={handleChange}
          />
        )}

        {currentSettings.showCompanyUrl && (
          <input
            className='custom-input w-full'
            name='companyUrl'
            placeholder={currentSettings.companyUrlLabel}
            value={form.companyUrl}
            onChange={handleChange}
          />
        )}

        <div className='grid grid-cols-2 gap-4'>
          {currentSettings.showStartDate && (
            <input
              className='custom-input w-full'
              name='startDate'
              placeholder={currentSettings.startDateLabel}
              value={form.startDate}
              onChange={handleChange}
            />
          )}

          <input
            className='custom-input w-full'
            name='endDate'
            placeholder={currentSettings.endDateLabel}
            value={form.endDate}
            onChange={handleChange}
          />
        </div>

        {currentSettings.showDescriptions && (
          <textarea
            className='custom-input min-h-[200px] w-full'
            name='descriptions'
            placeholder={currentSettings.descriptionsLabel}
            value={form.descriptions}
            onChange={handleChange}
          />
        )}

        <div className='flex justify-end gap-2'>
          <Button className='custom-button' onClick={closeModal}>
            Cancel
          </Button>

          <Button
            className='custom-button'
            loading={loading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

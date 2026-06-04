import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Button,
  Chip,
  SegmentedButtons,
  TextField,
  buttonWidthEnum,
} from '../dist/dist/index.jsx';
import '../dist/dist/theming/booking-form.css';
import './styles.css';
import standardRoomImage from '../img/638905038895238797-b2a3803f-0648-417b-959d-0f86c6768e8b.jpg';
import suiteRoomImage from '../img/638905039312398814-82a5d543-224a-4524-8a0f-b513be82f9bc.jpg';
import mealIcon from '../img/svg/restaurant.svg';
import cancellationIcon from '../img/svg/unlock.svg';
import paymentIcon from '../img/svg/purse.svg';
import bathroomIcon from '../img/svg/features/bathroom.svg';
import doubleBedIcon from '../img/svg/features/double_bed.svg';
import balconyIcon from '../img/svg/features/balcony.svg';
import airConditioningIcon from '../img/svg/features/air_conditioning.svg';
import hairdryerIcon from '../img/svg/features/hairdryer.svg';
import viewIcon from '../img/svg/features/view.svg';
import kingBedIcon from '../img/svg/features/king_bed.svg';
import lockIcon from '../img/svg/features/electronic_locks.svg';
import wifiIcon from '../img/svg/features/wifi.svg';
import arrowDownIcon from '../img/svg/arrow-down.svg';
import crossIcon from '../img/svg/cross.svg';

const roomImages = {
  standard: standardRoomImage,
  suite: suiteRoomImage,
};

const filters = [
  {
    key: 'bedType',
    label: 'Тип кровати',
    type: 'multi',
    scope: 'room',
    options: [
      { value: 'double', label: 'Двуспальная кровать' },
      { value: 'single', label: 'Односпальная кровать' },
    ],
  },
  {
    key: 'view',
    label: 'Вид из окна',
    type: 'multi',
    scope: 'room',
    options: [
      { value: 'mountain', label: 'Вид на горы' },
      { value: 'sea', label: 'Вид на море' },
      { value: 'river', label: 'Вид на реку' },
    ],
  },
  { key: 'balcony', label: 'Балкон', type: 'single', scope: 'room' },
  { key: 'freeCancellation', label: 'Бесплатная отмена', type: 'single', scope: 'rate' },
  { key: 'noPrepayment', label: 'Без предоплаты', type: 'single', scope: 'rate' },
];

const initialFilterState = {
  bedType: [],
  view: [],
  balcony: false,
  freeCancellation: false,
  noPrepayment: false,
};

const rooms = [
  {
    id: 'standard-family',
    image: roomImages.standard,
    name: 'Трехместный семейный номер Standard',
    params: '30 кв.м · до 5 мест',
    guests: '1 двуспальная кровать · 1 диван',
    filterTags: {
      bedType: ['double'],
      view: ['river'],
      balcony: true,
    },
    photoFeatures: [bathroomIcon, doubleBedIcon, balconyIcon, airConditioningIcon, hairdryerIcon],
    rates: [
      {
        id: 'standard-basic-flex',
        meal: 'Питание не включено',
        cancellation: 'Бесплатная отмена',
        payment: 'Без предоплаты',
        price: 14010,
        taxes: 'Налоги и сборы включены',
      },
      {
        id: 'standard-basic-prepay',
        meal: 'Питание не включено',
        cancellation: 'Бесплатная отмена',
        payment: 'Нужна предоплата',
        price: 14010,
        taxes: 'Налоги и сборы включены',
      },
      {
        id: 'standard-breakfast',
        meal: 'Завтрак',
        cancellation: 'Бесплатная отмена',
        payment: 'Без предоплаты',
        price: 17512,
        taxes: 'Налоги и сборы включены',
      },
    ],
  },
  {
    id: 'suite',
    image: roomImages.suite,
    name: 'Люкс',
    params: '32 кв.м · до 3 мест',
    guests: '1 большая двуспальная кровать',
    filterTags: {
      bedType: ['double'],
      view: ['mountain'],
      balcony: false,
    },
    photoFeatures: [viewIcon, kingBedIcon, airConditioningIcon, lockIcon, wifiIcon],
    rates: [
      {
        id: 'suite-basic-prepay',
        meal: 'Питание не включено',
        cancellation: 'Бесплатная отмена',
        payment: 'Нужна предоплата',
        price: 22100,
        taxes: 'Налоги и сборы включены',
      },
      {
        id: 'suite-breakfast-flex',
        meal: 'Завтрак',
        cancellation: 'Условия отмены',
        payment: 'Без предоплаты',
        price: 24800,
        taxes: 'Налоги и сборы включены',
      },
      {
        id: 'suite-breakfast-premium',
        meal: 'Завтрак',
        cancellation: 'Условия отмены',
        payment: 'Без предоплаты',
        price: 26350,
        taxes: 'Налоги и сборы включены',
      },
    ],
  },
];

function App() {
  const [screen, setScreen] = React.useState('list');
  const [bookingFor, setBookingFor] = React.useState('self');
  const [activeFilters, setActiveFilters] = React.useState(initialFilterState);
  const [openFilterKey, setOpenFilterKey] = React.useState(null);
  const [selectedOffer, setSelectedOffer] = React.useState(() => ({ room: rooms[0], rate: rooms[0].rates[0] }));

  const bookingForItems = [
    { id: 'self', label: 'Для себя', value: 'self' },
    { id: 'other', label: 'Для другого', value: 'other' },
  ];

  const handleSelectRate = (room, rate) => {
    setSelectedOffer({ room, rate });
    setScreen('checkout');
  };

  const handleToggleSingleFilter = (filterKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
    setOpenFilterKey(null);
  };

  const handleToggleMultiFilterOption = (filterKey, optionValue) => {
    setActiveFilters((prev) => {
      const nextValues = prev[filterKey].includes(optionValue)
        ? prev[filterKey].filter((value) => value !== optionValue)
        : [...prev[filterKey], optionValue];

      return {
        ...prev,
        [filterKey]: nextValues,
      };
    });
  };

  const handleFilterChipClick = (filter) => {
    if (filter.type === 'single') {
      handleToggleSingleFilter(filter.key);
      return;
    }

    setOpenFilterKey((prev) => (prev === filter.key ? null : filter.key));
  };

  const handleClearFilter = (filterKey) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterKey]: Array.isArray(prev[filterKey]) ? [] : false,
    }));

    if (openFilterKey === filterKey) {
      setOpenFilterKey(null);
    }
  };

  const filteredRooms = rooms
    .map((room) => ({
      ...room,
      rates: room.rates.filter((rate) => matchesRateFilters(rate, activeFilters)),
    }))
    .filter((room) => matchesRoomFilters(room, activeFilters) && room.rates.length > 0);

  return (
    <div className="prototype-shell">
      <div className="phone-frame">
        <TopUtilityBar />
        <SearchSummary muted={screen === 'checkout'} />

        {screen === 'list' ? (
          <>
            <SectionHeader title="Выберите номер" />
            <div className="filters-block">
              <div className="filters-row">
                {filters.map((filter) => (
                  <FilterChip
                    active={isFilterActive(filter, activeFilters)}
                    filter={filter}
                    key={filter.key}
                    onClear={handleClearFilter}
                    onClick={handleFilterChipClick}
                    open={openFilterKey === filter.key}
                    value={activeFilters[filter.key]}
                  />
                ))}
              </div>
              {openFilterKey ? (
                <FilterDropdown
                  filter={filters.find((filter) => filter.key === openFilterKey)}
                  onToggleOption={handleToggleMultiFilterOption}
                  selectedValues={activeFilters[openFilterKey]}
                />
              ) : null}
            </div>
            <div className="rooms-list">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} onSelectRate={handleSelectRate} />
              ))}
              {filteredRooms.length === 0 ? <EmptyState /> : null}
            </div>
          </>
        ) : (
          <CheckoutScreen
            bookingFor={bookingFor}
            bookingForItems={bookingForItems}
            onBack={() => setScreen('list')}
            onBookingForChange={setBookingFor}
            selectedOffer={selectedOffer}
          />
        )}
      </div>
    </div>
  );
}

function TopUtilityBar() {
  return (
    <div className="top-utility-bar">
      <div className="utility-chip flag-chip">
        <span className="flag-icon" aria-hidden="true" />
      </div>
      <div className="utility-chip currency-chip">RUB</div>
      <div className="utility-actions">
        <div className="utility-icon lock-icon" aria-hidden="true" />
        <div className="utility-icon user-icon" aria-hidden="true" />
      </div>
    </div>
  );
}

function SearchSummary({ muted }) {
  return (
    <div className={`search-summary ${muted ? 'search-summary-muted' : ''}`}>
      <div className="search-field-block">
        <div className="search-label">Заезд - Выезд</div>
        <div className="search-value-row">
          <div className="search-value">24 декабря - 25 декабря</div>
          <div className="calendar-icon" aria-hidden="true" />
        </div>
      </div>
      <div className="search-field-block">
        <div className="search-label">Гости</div>
        <div className="search-value-row">
          <div className="search-value">2 взрослых</div>
          <div className="chevron-icon" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, onBack }) {
  return (
    <div className="section-header-wrap">
      <div className="section-header">
        {onBack ? (
          <button className="back-button" onClick={onBack} type="button" aria-label="Назад">
            &lt;
          </button>
        ) : null}
        <h1>{title}</h1>
      </div>
      <div className="section-divider" />
    </div>
  );
}

function RoomCard({ room, onSelectRate }) {
  return (
    <article className="room-card">
      <div className="room-image-wrap">
        <div className="room-features-overlay">
          {room.photoFeatures.map((icon, index) => (
            <div className="room-feature-tile" key={`${room.id}-feature-${index}`}>
              <SvgIcon className="room-feature-svg" icon={icon} />
            </div>
          ))}
        </div>
        <img alt={room.name} className="room-image" src={room.image} />
      </div>
      <div className="room-card-body">
        <div className="room-title-row">
          <h2>{room.name}</h2>
          <button className="circle-toggle" type="button" aria-label="Открыть детали">
            <SvgIcon className="room-toggle-icon" icon={arrowDownIcon} />
          </button>
        </div>
        <div className="room-meta">{room.params}</div>
        <div className="room-submeta">{room.guests}</div>
        <div className="rates-slider" role="region" aria-label={`Тарифы для ${room.name}`}>
          {room.rates.map((rate) => (
            <RateCard key={rate.id} rate={rate} onSelect={() => onSelectRate(room, rate)} />
          ))}
        </div>
      </div>
    </article>
  );
}

function RateCard({ rate, onSelect }) {
  const features = [
    { text: rate.meal, benefit: rate.meal === 'Завтрак', icon: mealIcon },
    { text: rate.cancellation, benefit: rate.cancellation === 'Бесплатная отмена', icon: cancellationIcon },
    { text: rate.payment, benefit: rate.payment === 'Без предоплаты', icon: paymentIcon },
  ];

  return (
    <div className="rate-card">
      <div className="rate-feature-list">
        {features.map((feature) => (
          <div key={feature.text} className="rate-feature">
            <SvgIcon className={`rate-feature-icon ${feature.benefit ? 'rate-feature-icon-benefit' : ''}`} icon={feature.icon} />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>
      <div className="rate-price-block">
        <div className="rate-price-caption">Стоимость за 2 дня</div>
        <div className="rate-price">{formatPrice(rate.price)}</div>
        <div className="rate-taxes">{rate.taxes}</div>
      </div>
      <Button form="round" onClick={onSelect} size="m" variant="primary" width={buttonWidthEnum.full}>
        Выбрать
      </Button>
    </div>
  );
}

function CheckoutScreen({ bookingFor, bookingForItems, onBack, onBookingForChange, selectedOffer }) {
  const { room, rate } = selectedOffer;

  return (
    <>
      <SectionHeader onBack={onBack} title="Введите данные гостей" />
      <div className="checkout-content">
        <div className="checkout-card guest-form-card">
          <h2>Введите свои данные</h2>
          <div className="selected-offer-inline">
            <div className="selected-offer-room">{room.name}</div>
            <div className="selected-offer-rate">{rate.meal} · {rate.cancellation} · {rate.payment}</div>
          </div>
          <div className="field-caption">Я бронирую</div>
          <SegmentedButtons
            fullWidth
            hasError={false}
            items={bookingForItems}
            name="booking-for"
            onChangeAction={onBookingForChange}
            value={bookingFor}
          />

          <div className="auth-copy">
            Авторизуйтесь удобным способом - данные заполнятся автоматически. Или введите их вручную.
          </div>

          <div className="auth-icons-row">
            <div className="auth-icon vk">VK</div>
            <div className="auth-icon tbank">T</div>
            <div className="auth-icon sber">S</div>
            <div className="auth-icon alfa">A</div>
          </div>

          <div className="text-fields-stack">
            <TextField placeholder="Фамилия" showTooltip={false} />
            <TextField placeholder="Имя" showTooltip={false} />
            <TextField placeholder="Отчество" showTooltip={false} />
            <TextField placeholder="Телефон" showTooltip={false} />
            <TextField placeholder="Электронная почта" showTooltip={false} />
          </div>
        </div>
      </div>

      <div className="checkout-bottom-bar">
        <div className="checkout-stay-meta">
          <div className="stay-dates">24 дек. - 25 дек.</div>
          <div className="stay-guests">1 дом, 2 гостя</div>
        </div>
        <div className="checkout-price-summary">
          <div className="checkout-price">{formatPrice(rate.price)}</div>
          <div className="checkout-price-taxes">{rate.taxes}</div>
        </div>
        <button className="checkout-collapse" onClick={onBack} type="button" aria-label="Назад к выбору">
          ^
        </button>
      </div>
    </>
  );
}

function SvgIcon({ className, icon }) {
  return <img alt="" aria-hidden="true" className={className} src={icon} />;
}

function FilterChip({ active, filter, onClear, onClick, open, value }) {
  const count = Array.isArray(value) ? value.length : 0;
  const label = filter.type === 'multi' && count > 0 ? `${filter.label}: ${count}` : filter.label;

  return (
    <div className="filter-chip-wrap">
      <Chip
        className={`filter-chip ${active ? 'filter-chip-active' : ''} ${open ? 'filter-chip-open' : ''}`}
        endIcon={
          active ? (
            <span
              aria-hidden="true"
              className="filter-chip-clear"
              onClick={(event) => {
                event.stopPropagation();
                onClear(filter.key);
              }}
            >
              <SvgIcon className="filter-chip-clear-icon" icon={crossIcon} />
            </span>
          ) : (
            filter.type === 'multi' ? <SvgIcon className={`filter-chip-arrow ${open ? 'filter-chip-arrow-open' : ''}`} icon={arrowDownIcon} /> : null
          )
        }
        label={label}
        onClick={() => onClick(filter)}
        selected={active || open}
      />
    </div>
  );
}

function FilterDropdown({ filter, onToggleOption, selectedValues }) {
  if (!filter || filter.type !== 'multi') {
    return null;
  }

  return (
    <div className={`filter-dropdown filter-dropdown-${filter.key}`}>
      {filter.options.map((option) => {
        const checked = selectedValues.includes(option.value);

        return (
          <label className="filter-dropdown-option" key={option.value}>
            <input
              checked={checked}
              onChange={() => onToggleOption(filter.key, option.value)}
              type="checkbox"
            />
            <span className={`filter-dropdown-checkbox ${checked ? 'filter-dropdown-checkbox-checked' : ''}`}>
              {checked ? '✓' : ''}
            </span>
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state-card">
      <div className="empty-state-title">Нет доступных вариантов</div>
      <div className="empty-state-text">Измените фильтры, чтобы снова показать номера и тарифы.</div>
    </div>
  );
}

function matchesRoomFilters(room, activeFilters) {
  if (activeFilters.balcony && !room.filterTags.balcony) {
    return false;
  }

  if (activeFilters.bedType.length > 0 && !activeFilters.bedType.some((value) => room.filterTags.bedType.includes(value))) {
    return false;
  }

  if (activeFilters.view.length > 0 && !activeFilters.view.some((value) => room.filterTags.view.includes(value))) {
    return false;
  }

  return true;
}

function matchesRateFilters(rate, activeFilters) {
  if (activeFilters.freeCancellation && rate.cancellation !== 'Бесплатная отмена') {
    return false;
  }

  if (activeFilters.noPrepayment && rate.payment !== 'Без предоплаты') {
    return false;
  }

  return true;
}

function isFilterActive(filter, activeFilters) {
  const value = activeFilters[filter.key];
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

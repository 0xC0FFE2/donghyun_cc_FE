import React from 'react';
import ProfileCard from '../components/Profile-card';
import CountCard from '../components/Count-card';
import RecentPosts from '../components/RecentPosts';
import CategoryPosts from '../components/CategoryPosts';

function Profile() {
  const posts = [
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 2, title: 'React 컴포넌트 최적화하기', date: '24.09.20', category: '프론트엔드' },
    { id: 3, title: 'CI/CD 파이프라인 구축하기', date: '24.09.18', category: 'CI/CD' },
    { id: 4, title: 'Docker를 이용한 개발 환경 구축', date: '24.09.16', category: '개발 지식' },
    { id: 5, title: 'GraphQL vs REST API', date: '24.09.14', category: '백엔드' },
    { id: 6, title: 'React Native로 모바일 앱 만들기', date: '24.09.12', category: '프론트엔드' },
    { id: 7, title: 'Node.js의 비동기 프로그래밍 이해하기', date: '24.09.11', category: '백엔드' },
    { id: 8, title: 'TypeScript 기본 문법', date: '24.09.10', category: '백엔드' },
    { id: 9, title: '웹 성능 최적화 기법', date: '24.09.09', category: '프론트엔드' },
    { id: 10, title: 'Kubernetes 기본 개념', date: '24.09.08', category: 'CI/CD' },
    { id: 11, title: 'Nginx로 로드 밸런싱 설정하기', date: '24.09.07', category: '개발 지식' },
    { id: 12, title: 'OAuth 인증 흐름 이해하기', date: '24.09.06', category: '백엔드' },
    { id: 13, title: 'TailwindCSS로 빠르게 디자인하기', date: '24.09.05', category: '프론트엔드' },
    { id: 14, title: 'Redis를 이용한 캐싱 전략', date: '24.09.04', category: '백엔드' },
    { id: 15, title: 'AWS와 클라우드 컴퓨팅 기초', date: '24.09.03', category: 'CI/CD' },
  ];

  const recents = [
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
    { id: 1, title: 'typeORM에서 외래키를 설정하는 방법', date: '24.09.22', category: '백엔드' },
  ];

  return (
    <div className="container mx-auto px-4 py-1 pt-12">
      <h2 className="text-2xl font-bold mt-6 mb-6">소개</h2>
      <ProfileCard />
      <CountCard count={recents.length.toString()} />
      <RecentPosts recents={recents} />
      <CategoryPosts posts={posts} viewPage='8' />
    </div>
  );
}

export default Profile;
